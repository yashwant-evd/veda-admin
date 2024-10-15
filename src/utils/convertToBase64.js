import { isObject } from "./isObject";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const GenerateBase64 = async (file) => {
  let ImageBase64;
  if (isObject(file)) {
    ImageBase64 = await convertToBase64(file);
  } else {
    ImageBase64 = file;
  }
  return ImageBase64;
};

export const GenerateMultipleBase64 = async (files) => {
  let ImageBase64 = [];
  if (Array.isArray(files)) {
    ImageBase64 = await Promise.all(files.map(async (file) => {
      if (isObject(file)) {
        const base64 = await convertToBase64(file);
        return { image: base64 };
      } else {
        return { image: file };
      }
    }));
  } else {
    ImageBase64 = files;
  }
  return ImageBase64;
};