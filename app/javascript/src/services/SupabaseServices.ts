import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
);

const _bucketName: string = import.meta.env.VITE_SUPABASE_BUCKET_NAME;

export async function createBucket(bucketName: string) {
  return await supabase.storage.createBucket(bucketName, {
    public: true,
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: "1MB",
  });
}

interface UploadFileOptions {
  file: File;
  filePath?: string;
  allowedContentType?: string;
  bucketName?: string;
}

export async function uploadFile({
  file,
  filePath = "",
  allowedContentType = "image/*",
  bucketName = _bucketName,
}: UploadFileOptions): Promise<any> {
  return await supabase.storage.from(bucketName).upload(filePath, file, {
    upsert: true,
    contentType: allowedContentType,
  });
}

export async function deleteFile(
  objectKeys: string[],
  bucketName: string = _bucketName,
) {
  return await supabase.storage.from(bucketName).remove(objectKeys);
}

export async function fetchAllFiles(bucketName: string = _bucketName) {
  try {
    const result = await supabase.storage.from(bucketName).list(undefined, {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    });

    return result.data?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        type: item.metadata.mimetype,
        src: getPublicUrl(item.name),
        size: item.metadata.size,
        createdAt: item.created_at,
      };
    });
  } catch (error) {
    return error;
  }
}

export async function deleteAllFiles(bucketName: string = _bucketName) {
  return await supabase.storage.emptyBucket(bucketName);
}

export function getPublicUrl(
  filename: string,
  bucketName: string = _bucketName,
) {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filename);

  return data.publicUrl;
}

export function download(filename: string, bucketName: string = _bucketName) {
  const response = supabase.storage.from(bucketName).download(filename);
  return response;
}
