import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export async function uploadFile (file, filePath: string = '', bucketName: string = 'media', allowedContentType = 'image/*') {
  try {
    return await supabase.storage.from(bucketName).upload(filePath, file, {
      upsert: true,
      contentType: allowedContentType,
      fileSizeLimit: '1MB'
    });
  } catch (error) {
    return error;
  }
}

export async function deleteFile (objectKeys: string[], bucketName: string = 'media') {
  try {
    return await supabase.storage.from(bucketName).remove(objectKeys)
  } catch (error) {
    return error;
  }
}

export async function fetchAllFiles(bucketName: string, folderName: string) {
  try {
    const data = await supabase
      .storage
      .from('media')
      .list('book-store', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })
    return data;
  } catch (error) {
    return error;
  }
}

