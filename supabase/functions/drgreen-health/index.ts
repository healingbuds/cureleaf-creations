import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DRGREEN_API_URL = "https://api.drgreennft.com/api/v1";
const API_TIMEOUT_MS = 10000;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const checks: Record<string, { status: string; message?: string; duration?: number }> = {};

  try {
    // Check 1: API credentials configured
    const apiKey = Deno.env.get("DRGREEN_API_KEY");
    const secretKey = Deno.env.get("DRGREEN_PRIVATE_KEY");
    
    checks.credentials = {
      status: apiKey && secretKey ? "ok" : "error",
      message: apiKey && secretKey 
        ? "API credentials configured" 
        : "Missing API credentials (DRGREEN_API_KEY or DRGREEN_PRIVATE_KEY)",
    };

    if (!apiKey || !secretKey) {
      return new Response(
        JSON.stringify({
          status: "unhealthy",
          checks,
          timestamp: new Date().toISOString(),
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check 2: API connectivity (simple GET request to strains endpoint)
    const connectivityStart = Date.now();
    try {
      // Build query string for signing
      const queryParams = "orderBy=desc&take=1&page=1";
      
      // Sign the query string
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secretKey);
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(queryParams));
      const signatureBytes = new Uint8Array(signatureBuffer);
      let binary = '';
      for (let i = 0; i < signatureBytes.byteLength; i++) {
        binary += String.fromCharCode(signatureBytes[i]);
      }
      const signature = btoa(binary);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

      const response = await fetch(`${DRGREEN_API_URL}/strains?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-apikey": apiKey,
          "x-auth-signature": signature,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const connectivityDuration = Date.now() - connectivityStart;

      if (response.ok) {
        const data = await response.json();
        checks.api_connectivity = {
          status: "ok",
          message: `API reachable, returned ${Array.isArray(data) ? data.length : 'data'} strains`,
          duration: connectivityDuration,
        };
      } else {
        const errorText = await response.text();
        checks.api_connectivity = {
          status: "warning",
          message: `API returned ${response.status}: ${errorText.slice(0, 100)}`,
          duration: connectivityDuration,
        };
      }
    } catch (connError) {
      const errorMessage = connError instanceof Error ? connError.message : "Unknown error";
      checks.api_connectivity = {
        status: "error",
        message: `API unreachable: ${errorMessage}`,
        duration: Date.now() - connectivityStart,
      };
    }

    // Determine overall health
    const allOk = Object.values(checks).every(c => c.status === "ok");
    const hasError = Object.values(checks).some(c => c.status === "error");

    return new Response(
      JSON.stringify({
        status: allOk ? "healthy" : hasError ? "unhealthy" : "degraded",
        checks,
        totalDuration: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      }),
      { 
        status: allOk ? 200 : hasError ? 503 : 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Health Check] Error:", errorMessage);
    
    return new Response(
      JSON.stringify({
        status: "error",
        message: errorMessage,
        timestamp: new Date().toISOString(),
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
