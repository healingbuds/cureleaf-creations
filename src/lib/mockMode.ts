/**
 * Mock Mode Configuration
 * 
 * Enables testing of the full registration flow without needing
 * the live Dr. Green API to have write permissions.
 * 
 * To enable mock mode:
 * - Set VITE_MOCK_DRGREEN_API=true in environment
 * - OR call enableMockMode() from browser console
 * - OR localStorage.setItem('MOCK_DRGREEN_API', 'true')
 */

// Check if mock mode is enabled
export function isMockModeEnabled(): boolean {
  // Check environment variable first
  if (import.meta.env.VITE_MOCK_DRGREEN_API === 'true') {
    return true;
  }
  
  // Check localStorage (allows runtime toggle)
  if (typeof window !== 'undefined') {
    return localStorage.getItem('MOCK_DRGREEN_API') === 'true';
  }
  
  return false;
}

// Enable mock mode at runtime
export function enableMockMode(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('MOCK_DRGREEN_API', 'true');
    console.log('[MockMode] ✅ Mock mode ENABLED - API calls will be simulated');
  }
}

// Disable mock mode at runtime
export function disableMockMode(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('MOCK_DRGREEN_API');
    console.log('[MockMode] ❌ Mock mode DISABLED - Live API will be used');
  }
}

// Generate a realistic mock client ID
export function generateMockClientId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `mock-${timestamp}-${random}`;
}

// Generate a mock KYC verification link
export function generateMockKycLink(clientId: string): string {
  // This simulates the KYC provider URL format
  const baseUrl = 'https://kyc.drgreennft.com';
  const verificationId = btoa(clientId).replace(/=/g, '');
  return `${baseUrl}/verify/${verificationId}`;
}

// Simulated API response for client creation
export interface MockClientResponse {
  success: boolean;
  clientId: string;
  kycLink: string;
  message: string;
  data: {
    id: string;
    email: string;
    fullName: string;
    countryCode: string;
    isKYCVerified: boolean;
    adminApproval: string;
    createdAt: string;
  };
}

// Create a mock successful client creation response
export function createMockClientResponse(payload: {
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string;
}): MockClientResponse {
  const clientId = generateMockClientId();
  const kycLink = generateMockKycLink(clientId);
  
  console.log('[MockMode] 🎭 Generating mock client response:', {
    clientId,
    kycLink,
    email: payload.email,
  });
  
  return {
    success: true,
    clientId,
    kycLink,
    message: 'Client created successfully (MOCK MODE)',
    data: {
      id: clientId,
      email: payload.email,
      fullName: `${payload.firstName} ${payload.lastName}`,
      countryCode: payload.countryCode,
      isKYCVerified: false,
      adminApproval: 'PENDING',
      createdAt: new Date().toISOString(),
    },
  };
}

// Simulate API delay for realistic UX testing
export async function simulateApiDelay(minMs: number = 500, maxMs: number = 1500): Promise<void> {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  await new Promise(resolve => setTimeout(resolve, delay));
}

// Mock mode status for debugging
export function getMockModeStatus(): {
  enabled: boolean;
  source: 'env' | 'localStorage' | 'disabled';
} {
  if (import.meta.env.VITE_MOCK_DRGREEN_API === 'true') {
    return { enabled: true, source: 'env' };
  }
  
  if (typeof window !== 'undefined' && localStorage.getItem('MOCK_DRGREEN_API') === 'true') {
    return { enabled: true, source: 'localStorage' };
  }
  
  return { enabled: false, source: 'disabled' };
}

// Expose functions globally for browser console access
if (typeof window !== 'undefined') {
  (window as any).mockMode = {
    enable: enableMockMode,
    disable: disableMockMode,
    status: getMockModeStatus,
    isEnabled: isMockModeEnabled,
  };
  
  // Log mock mode status on load
  const status = getMockModeStatus();
  if (status.enabled) {
    console.log('[MockMode] 🎭 Mock mode is ENABLED via', status.source);
  }
}
