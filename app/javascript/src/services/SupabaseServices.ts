import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export async function uploadFile (file, filePath: string = '', allowedContentType = 'image/*') {
  const { data, error } = await supabase.storage.from('media').upload(filePath, file, {
    upsert: true,
    contentType: allowedContentType,
    fileSizeLimit: '1MB'
  });

  if (error) {
    return error;
  } else {
    return data;
  }
}

export async function deleteFile(objectKeys: string[]) {
  const { data, error } = await supabase.storage.from('media').remove(objectKeys);

  if (error) {
    return error;
  } else {
    return data;
  }
}

export async function fetchAllFiles(bucketName: string = 'media') {
  try {
    const data = await supabase
      .storage
      .from(bucketName).list(undefined, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'asc' },
      });
    return data;
  } catch (error) {
    return error;
  }
}

export function getPublicUrl(bucketName: string = 'media', filename: string) {
  const { data } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(filename);
    
  return data.publicUrl;
}

