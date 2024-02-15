import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export default async function ImageCompress(image: File) {
  try {
    const compressedFile = await imageCompression(image, options);

    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(
      `compressedFile size ${image.size / 1024 / 1024} ${
        compressedFile.size / 1024 / 1024
      } MB`
    ); // smaller than maxSizeMB
    return compressedFile;
  } catch (error) {
    console.log(error);
    return image;
  }
}
