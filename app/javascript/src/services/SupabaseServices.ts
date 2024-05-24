import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

const _bucketName: string = import.meta.env.VITE_SUPABASE_BUCKET_NAME;

export async function createBucket(bucketName: string) {
  return await supabase.storage.createBucket(bucketName, {
    public: true,
    allowedMimeTypes: ['image/*'],
    fileSizeLimit: '1MB',
  })
}

export async function uploadFile (file, filePath: string = '', allowedContentType = 'image/*', bucketName: string = _bucketName) {
  return await supabase.storage.from(bucketName).upload(filePath, file, {
    upsert: true,
    contentType: allowedContentType
  });
}

export async function deleteFile(objectKeys: string[], bucketName: string = _bucketName) {
  return await supabase.storage.from(bucketName).remove(objectKeys);
}

export async function fetchAllFiles(bucketName: string = _bucketName) {
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

export async function deleteAllFiles(bucketName: string = _bucketName) {
  return await supabase
    .storage
    .emptyBucket(bucketName);
}

export function getPublicUrl(filename: string, bucketName: string = _bucketName) {
  const { data } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(filename);
    
  return data.publicUrl;
}

export function download(filename: string, bucketName: string = _bucketName) {
  const response = supabase.storage.from(bucketName).download(filename);
  return response;
}
