import ImageCompress from "./image_compress";

export function takeImgInput(source?: "camera" | "files"): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    if (source == "camera") {
      input.capture = "environment";
    }
    input.addEventListener(
      "change",
      async function (this: HTMLInputElement, ev: Event) {
        if (this.files && this.files.length === 1) {
          const compressed = await ImageCompress(this.files[0]);
          const blob = URL.createObjectURL(compressed);
          resolve(blob);
        } else {
          reject("No image selected.");
        }
      }
    );
    input.click();
    input.remove();
  });
}
