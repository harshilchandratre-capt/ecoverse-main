import { supabase } from './supabase';
import { Product, Category, LandingContent } from './supabase';

// Product operations
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Category operations
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const createCategory = async (category: Omit<Category, 'id' | 'created_at'>): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Landing content operations
export const getLandingContent = async (): Promise<Record<string, any>> => {
  const { data, error } = await supabase
    .from('landing_content')
    .select('section, content');

  if (error) throw error;

  const contentMap: Record<string, any> = {};
  data?.forEach((item) => {
    contentMap[item.section] = item.content;
  });

  return contentMap;
};

export const updateLandingContent = async (section: string, content: any): Promise<void> => {
  const { error } = await supabase
    .from('landing_content')
    .update({ 
      content, 
      updated_at: new Date().toISOString() 
    })
    .eq('section', section);

  if (error) throw error;
};
