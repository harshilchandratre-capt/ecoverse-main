-- Initial database setup for Ecoverse application
-- This migration creates all necessary tables and configurations

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  image_url text,
  price integer,
  stock_quantity integer DEFAULT 0,
  is_active boolean DEFAULT true,
  specifications jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  description text,
  image_url text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create landing_content table
CREATE TABLE IF NOT EXISTS landing_content (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  section text UNIQUE NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table (optional - for custom admin management)
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  role text DEFAULT 'admin',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for products table
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for categories table
CREATE POLICY "Anyone can view active categories"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for landing_content table
CREATE POLICY "Anyone can view landing content"
  ON landing_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update landing content"
  ON landing_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for admin_users table
CREATE POLICY "Authenticated users can view admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default categories
INSERT INTO categories (name, description, sort_order) VALUES
  ('Bottle Caps', 'Premium bottle caps for various applications', 1),
  ('Pesticide Bottles', 'Agricultural and pesticide containers', 2)
ON CONFLICT (name) DO NOTHING;

-- Insert default landing page content
INSERT INTO landing_content (section, content) VALUES
  ('hero', '{
    "title": "Premium Imported Bottle Caps & Bottles",
    "subtitle": "Quality packaging solutions for the beverage and agricultural industries",
    "tagline": "Your trusted partner for premium packaging"
  }'),
  ('about', '{
    "title": "About Our Company",
    "description": "We are a leading importer and distributor of premium bottle caps and pesticide bottles. With years of experience in the packaging industry, we provide high-quality solutions to businesses across various sectors. Our commitment to excellence ensures that every product meets the highest standards of quality and reliability."
  }'),
  ('contact', '{
    "address": "123 Industrial Way, Business District, City, State 12345",
    "phone": "+1 (555) 123-4567",
    "email": "info@premiumbottlecaps.com",
    "hours": "Monday - Friday: 8:00 AM - 6:00 PM\\nSaturday: 9:00 AM - 2:00 PM\\nSunday: Closed"
  }')
ON CONFLICT (section) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_landing_content_updated_at BEFORE UPDATE ON landing_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
