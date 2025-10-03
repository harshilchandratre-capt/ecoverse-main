import { supabase } from './supabase';

export const uploadImage = async (file: File, bucket: string, path?: string): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (bucket: string, path: string): Promise<void> => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const uploadDocument = async (file: File, path?: string): Promise<string> => {
  return uploadImage(file, 'documents', path);
};

export const uploadProductImage = async (file: File): Promise<string> => {
  return uploadImage(file, 'product-images');
};

export const uploadCategoryImage = async (file: File): Promise<string> => {
  return uploadImage(file, 'category-images');
};
