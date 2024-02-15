import { imageType } from "@/redux/types";
import jsPDF from "jspdf";

async function loadImage(url: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.src = url;
  await new Promise((resolve) => {
    image.onload = resolve;
  });
  return image;
}

function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function applyFilter(
  ctx: CanvasRenderingContext2D,
  filter: string | undefined
) {
  if (filter === "highContrast") {
    console.log("highContrast");
    ctx.filter = "grayscale(0%) contrast(300%) brightness(80%) saturate(0%)";
  }

  if (filter === "grayscale") {
    console.log("grayscale");
    ctx.filter = "grayscale(100%)";
  }
}

async function processImage(
  doc: jsPDF,
  canvas: HTMLCanvasElement,
  img: imageType,
  filter: string | undefined
) {
  const image = await loadImage(img.image);
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    applyFilter(ctx, filter);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  const dataUrl = canvas.toDataURL();
  console.log(dataUrl);
  doc.addImage(dataUrl, "JPEG", 0, 0, image.naturalWidth, image.naturalHeight);
}

export default async function createPDF(
  images: imageType[],
  filename: string,
  filter: string
): Promise<void> {
  if (images.length === 0)
    return Promise.reject("No images to create PDF from.");

  const firstPage = images[0];
  const firstImage = await loadImage(firstPage.image);
  const firstPageWidth = firstImage.naturalWidth;
  const firstPageHeight = firstImage.naturalHeight;
  const firstPagecanvas = createCanvas(firstPageWidth, firstPageHeight);

  return new Promise(async (resolve, reject) => {
    const doc = new jsPDF({
      format: [firstPageWidth, firstPageHeight],
      unit: "px",
      hotfixes: ["px_scaling"],
      orientation: "portrait",
      compress: true,
    });

    await processImage(doc, firstPagecanvas, firstPage, filter);
    firstImage.remove();
    firstPagecanvas.remove();

    for (let i = 1; i < images.length; i++) {
      const img = images[i];
      console.log(`Processing image ${i + 1} of ${images.length}`);
      const image = await loadImage(img.image);
      const canvas = createCanvas(image.naturalWidth, image.naturalHeight);
      doc.addPage([canvas.width, canvas.height]);
      await processImage(doc, canvas, img, filter);
      canvas.remove();
      image.remove();
    }

    doc.save(`${filename}.pdf`);
    resolve();
  });
}
