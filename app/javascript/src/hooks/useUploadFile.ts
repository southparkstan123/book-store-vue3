import { ref, computed } from "vue";

import type { ImageFile } from "@/types/types";

import { uploadFile, deleteFile, fetchAllFiles, getPublicUrl } from "@/services/SupabaseServices";

export const useUploadFile = () => {
  const imageData = ref<ImageFile[]>([]);

  const uploadToSupabase = async (file, allowedContentType = 'image/*') => {
    try {
      const { data } = await uploadFile(file, file.name, allowedContentType);
      console.log(data);
      const imageObject: ImageFile = {
        id: data.id,
        name: file.name,
        type: file.type,
        src: getPublicUrl('media', file.name),
        size: file.size,
        createdAt: Date.now(),
      };
      
      imageData.value.push(imageObject);
      // successCallback(imageObject);
    } catch (error) {
      return error;
      // errorCallback(error);
    }
  }

  const deleteFilesFromSupabase = async (objectKeys: string[], allowedContentType = 'image/*') => {
    try {
      const { data } = await deleteFile(objectKeys, allowedContentType);
      const index = imageData.value.findIndex(image => image.id === data[0].id)
      imageData.value.splice(index, 1);
      // successCallback(data);
    } catch (error) {
      return error;
      // errorCallback(error);
    }
  }

  // Fetch files
  const fetchFilesFromSupabase = async (bucketName: string = 'media', folderName: string = 'book-store') => {
    try {
      const { data } = await fetchAllFiles(bucketName, folderName);

      return data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          type: item.metadata.mimetype,
          src: getPublicUrl(bucketName, item.name),
          size: item.metadata.size,
          createdAt: item.created_at,
        };
      });

    } catch (error) {
      console.log(error);
    }
  }

  // const previewImages = (file) => {
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);

  //   fileReader.addEventListener("load", (e) => {
  //     let image = new Image();
  //     image.src = e.target.result;

  //     image.onload = () => {
  //       const imageObject: ImageFile = {
  //         name: file.name,
  //         type: file.type,
  //         src: image.src as string,
  //         size: file.size,
  //         createdAt: Date.now(),
  //       };

  //       imageData.value.push(imageObject);
  //     };
  //   });
  // };

  const onChangeFile = (payload: FileList) => {
    const files = payload;
    if (files) {
      Array.prototype.forEach.call(files, uploadToSupabase);
    }
  };

  // const deleteImage = (index) => {
  //   imageData.value.splice(index, 1);
  // };

  const displaySize = (size: number) =>
    (size / 1024 / 1024).toPrecision(3).toString() + "MB";

  const totalFileSize = computed<number>(() =>
    imageData.value.reduce((a, file) => a + file.size, 0),
  );

  return {
    imageData,
    onChangeFile,
    totalFileSize,
    displaySize,
    uploadToSupabase,
    fetchFilesFromSupabase,
    deleteFilesFromSupabase
  };
};
