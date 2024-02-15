import JSZip from "jszip";

export default async function createZipAndDownload(
  base64Images: string[],
  zipFileName: string
): Promise<void> {
  const zip = new JSZip();
  for (let i = 0; i < base64Images.length; i++) {
    const base64Image = base64Images[i];
    const binaryData = atob(base64Image.split(",")[1]);
    const blob = new Blob(
      [
        new Uint8Array(
          Array.from(binaryData).map((char) => char.charCodeAt(0))
        ),
      ],
      {
        type: "application/octet-stream",
      }
    );
    zip.file(`image_${i + 1}.png`, blob);
  }
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(zipBlob);
  link.download = zipFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
