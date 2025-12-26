-- Create storage bucket for generated product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for the bucket
CREATE POLICY "Anyone can view product images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Service role can insert product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Service role can update product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

CREATE POLICY "Service role can delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- Create table for tracking generated product images
CREATE TABLE public.generated_product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  original_image_url TEXT,
  generated_image_url TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.generated_product_images ENABLE ROW LEVEL SECURITY;

-- Everyone can view generated images (public product catalog)
CREATE POLICY "Anyone can view generated product images"
ON public.generated_product_images
FOR SELECT
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_generated_product_images_updated_at
BEFORE UPDATE ON public.generated_product_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for fast lookups
CREATE INDEX idx_generated_product_images_product_id ON public.generated_product_images(product_id);