import { ref, computed } from 'vue';

import type { ImageFile } from '@/types/types';


export const useUploadFile = () => {

  const imageData = ref<ImageFile[]>([]);

  const previewImages = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.addEventListener('load', (e) => {
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
          createdAt: Date.now()
        }

        imageData.value.push(imageObject);
      }
    });
  }
  
  const onChangeFile = (payload: FileList) => {
    const files = payload;
    if(files){
      Array.prototype.forEach.call(files, previewImages)
    }
  }
  
  const deleteImage = (index) => {
    imageData.value.splice(index,1);
  }

  const displaySize = (size: number) => (size/ 1024 / 1024).toPrecision(3).toString() + 'MB';

  const totalFileSize = computed<number>(() => imageData.value.reduce((a, file) => a + file.size, 0));

  return {
    imageData,
    onChangeFile,
    deleteImage,
    totalFileSize,
    displaySize
  }
}