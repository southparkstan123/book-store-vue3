import { ref, computed } from "vue";

import type { ImageFile } from "@/types/types";

import { uploadFile, deleteFile, fetchAllFiles } from "@/services/SupabaseServices";

export const useUploadFile = () => {
  const imageData = ref<ImageFile[]>([]);

  const uploadToSupabase = async (file, allowedContentType = 'image/*', successCallback: void, errorCallback: void) => {
    try {
      const data = await uploadFile(file, allowedContentType);
      const imageObject: ImageFile = {
        name: file.name,
        type: file.type,
        src: image.src as string,
        size: file.size,
        width: image.width,
        height: image.height,
        createdAt: Date.now(),
      };
      imageData.value.push(imageObject);
      successCallback(imageObject);
    } catch (error) {
      errorCallback(error);
    }
  }

  const deleteFromSupabase = async (objectKeys: string[], allowedContentType = 'image/*', successCallback: void, errorCallback: void) => {
    try {
      const data = await deleteFile(objectKeys, allowedContentType);
      successCallback(data);
    } catch (error) {
      errorCallback(error);
    }
  }

  // Fetch files
  const fetchFilesFromSupabase = async (bucketName: string = 'media', folderName: string = 'book-store') => {
    // try {
      const { data, error } = await fetchAllFiles(bucketName, folderName);
      console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const previewImages = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.addEventListener("load", (e) => {
      let image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        const imageObject: ImageFile = {
          name: file.name,
          type: file.type,
          src: image.src as string,
          size: file.size,
          width: image.width,
          height: image.height,
          createdAt: Date.now(),
        };

        imageData.value.push(imageObject);
      };
    });
  };

  const onChangeFile = (payload: FileList) => {
    const files = payload;
    if (files) {
      Array.prototype.forEach.call(files, uploadToSupabase);
    }
  };

  const deleteImage = (index) => {
    imageData.value.splice(index, 1);
  };

  const displaySize = (size: number) =>
    (size / 1024 / 1024).toPrecision(3).toString() + "MB";

  const totalFileSize = computed<number>(() =>
    imageData.value.reduce((a, file) => a + file.size, 0),
  );

  return {
    imageData,
    onChangeFile,
    deleteImage,
    totalFileSize,
    displaySize,
    uploadToSupabase,
    deleteFromSupabase,
    fetchFilesFromSupabase
  };
};
