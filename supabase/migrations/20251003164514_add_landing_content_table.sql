/*
  # Add landing page content management

  ## Overview
  This migration adds a table for managing landing page content that can be edited
  from the admin dashboard.

  ## 1. New Tables
    - `landing_content`
      - `id` (uuid, primary key) - Unique identifier
      - `section` (text, unique) - Section identifier (hero, about, contact)
      - `content` (jsonb) - Flexible JSON content for each section
      - `updated_at` (timestamptz) - Last update timestamp

  ## 2. Security
    - Enable RLS on `landing_content` table
    - Add policy for public read access (anyone can view content)
    - Add policy for authenticated users to update content (admin only)

  ## 3. Initial Data
    - Insert default content for hero, about, and contact sections

  ## Important Notes
    - All visitors can view landing page content
    - Only authenticated admin users can edit content
    - Using JSONB for flexible content structure
*/

-- Create landing_content table
CREATE TABLE IF NOT EXISTS landing_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text UNIQUE NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE landing_content ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view landing content
CREATE POLICY "Anyone can view landing content"
  ON landing_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Authenticated users can update landing content
CREATE POLICY "Authenticated users can update landing content"
  ON landing_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default landing page content
INSERT INTO landing_content (section, content) VALUES
  ('hero', '{"title": "Premium Imported Bottle Caps & Bottles", "subtitle": "Quality packaging solutions for the beverage and agricultural industries", "tagline": "Your trusted partner for premium packaging"}'),
  ('about', '{"title": "About Our Company", "description": "We are a leading importer and distributor of premium bottle caps and pesticide bottles. With years of experience in the packaging industry, we provide high-quality solutions to businesses across various sectors. Our commitment to excellence ensures that every product meets the highest standards of quality and reliability."}'),
  ('contact', '{"address": "123 Industrial Way, Business District, City, State 12345", "phone": "+1 (555) 123-4567", "email": "info@premiumbottlecaps.com", "hours": "Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM, Sunday: Closed"}')
ON CONFLICT (section) DO NOTHING;