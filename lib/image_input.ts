import ImageCompress from "./image_compress";

export function takeImgInput(source?: "camera" | "files"): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    if (source == "camera") {
      input.capture = "environment";
    }
    input.addEventListener(
      "change",
      async function (this: HTMLInputElement, ev: Event) {
        if (this.files && this.files.length === 1) {
          const compressed = await ImageCompress(this.files[0]);
          const base64 = await blobToBase64(compressed);
          resolve(base64);
        } else {
          reject("No image selected.");
        }
      }
    );
    input.click();
    input.remove();
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result?.toString().split(",")[1];
      if (base64String) {
        resolve("data:image/png;base64," + base64String);
      } else {
        reject(new Error("Failed to convert Blob to Base64"));
      }
    };

    reader.readAsDataURL(blob);
  });
}
