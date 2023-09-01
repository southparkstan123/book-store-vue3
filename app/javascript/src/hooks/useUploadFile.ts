import { ref } from 'vue';

export const useUploadFile = () => {

  const imageData = ref<ImageFile[]>([]);

  const previewImages = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
  
    fileReader.addEventListener('load', () => {
      const imageObject: ImageFile = {
        name: file.name,
        type: file.type,
        src: fileReader.result as string,
        size: file.size,
        createdAt: Date.now()
      }
  
      imageData.value.push(imageObject);
    });
  }
  
  const onChangeFile = (payload) => {
    const files = payload;
    if(files){
      Array.prototype.forEach.call(files, previewImages)
    }
  }
  
  const deleteImage = (index) => {
    imageData.value.splice(index,1);
  }

  return {
    imageData,
    onChangeFile,
    deleteImage
  }
}