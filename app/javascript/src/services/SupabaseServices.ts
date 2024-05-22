import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export async function uploadFile (file, filePath: string = '', allowedContentType = 'image/*', bucketName: string = 'media') {
  return await supabase.storage.from(bucketName).upload(filePath, file, {
    upsert: true,
    contentType: allowedContentType,
    fileSizeLimit: '1MB'
  });
}

export async function deleteFile(objectKeys: string[], bucketName: string = 'media') {
  return await supabase.storage.from(bucketName).remove(objectKeys);
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

export async function deleteAllFiles(bucketName: string = 'media') {
  return await supabase
    .storage
    .emptyBucket(bucketName);
}

export function getPublicUrl(filename: string, bucketName: string = 'media') {
  const { data } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(filename);
    
  return data.publicUrl;
}

