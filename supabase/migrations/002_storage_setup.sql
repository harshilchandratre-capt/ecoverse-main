-- Storage setup for file uploads
-- This migration configures storage buckets for images and documents

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('product-images', 'product-images', true),
  ('documents', 'documents', false),
  ('category-images', 'category-images', true);

-- Storage policies for product-images bucket
CREATE POLICY "Anyone can view product images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

-- Storage policies for documents bucket
CREATE POLICY "Authenticated users can view documents"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Authenticated users can update documents"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can delete documents"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'documents');

-- Storage policies for category-images bucket
CREATE POLICY "Anyone can view category images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'category-images');

CREATE POLICY "Authenticated users can upload category images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'category-images');

CREATE POLICY "Authenticated users can update category images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'category-images');

CREATE POLICY "Authenticated users can delete category images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'category-images');
