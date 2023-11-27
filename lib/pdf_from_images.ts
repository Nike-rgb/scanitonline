import { imageType } from "@/redux/types";
import jsPDF from "jspdf";

export default async function createPDF(
  images: imageType[],
  filename: string,
  filter: string
) {
  if (images.length === 0)
    return Promise.reject("No images to create PDF from.");

  const firstPage = images[0];
  const image = new Image();
  image.src = firstPage.image;
  const firstPageWidth = image.naturalWidth;
  const firstPageHeight = image.naturalHeight;

  const canvas = document.createElement("canvas");

  return new Promise((resolve, reject) => {
    const doc = new jsPDF({
      format: [firstPageWidth, firstPageHeight],
      unit: "px",
      hotfixes: ["px_scaling"],
      orientation: "portrait",
      compress: true,
    });
    images.forEach((img, i) => {
      image.src = img.image;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      if (i !== 0) {
        doc.addPage([canvas.width, canvas.height]);
      }

      const ctx = canvas.getContext("2d");

      //apply filters
      if (ctx) {
        if (filter === "highContrast") {
          console.log("highContrast");
          ctx.filter =
            "grayscale(0%) contrast(300%) brightness(80%) saturate(0%)";
        }

        if (filter === "grayscale") {
          console.log("grayscale");
          ctx.filter = "grayscale(100%)";
        }

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }

      const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
      doc.addImage(
        dataUrl,
        "JPEG",
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
      );
    });
    image.remove();
    canvas.remove();
    doc.save(`${filename}.pdf`);
  });
}

const applyFilter = (ctx: CanvasRenderingContext2D, filter: string) => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;

  const getGrayValue = (i: number) => {
    return (data[i] + data[i + 1] + data[i + 2]) / 3;
  };

  const applyAdaptiveThreshold = (i: number, localMean: number) => {
    const threshold = localMean;
    const value = getGrayValue(i) > threshold ? 255 : 0;

    data[i] = value; // Red
    data[i + 1] = value; // Green
    data[i + 2] = value; // Blue
  };

  switch (filter) {
    case "grayscale": {
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
    }

    case "highContrast":
      const windowSize = 5; // Adjust as needed

      for (let y = 0; y < ctx.canvas.height; y++) {
        for (let x = 0; x < ctx.canvas.width; x++) {
          const pixelIndex = (y * ctx.canvas.width + x) * 4;
          const localValues: number[] = [];

          for (
            let dy = -Math.floor(windowSize / 2);
            dy <= Math.floor(windowSize / 2);
            dy++
          ) {
            for (
              let dx = -Math.floor(windowSize / 2);
              dx <= Math.floor(windowSize / 2);
              dx++
            ) {
              const nx = x + dx;
              const ny = y + dy;

              if (
                nx >= 0 &&
                nx < ctx.canvas.width &&
                ny >= 0 &&
                ny < ctx.canvas.height
              ) {
                const localIndex = (ny * ctx.canvas.width + nx) * 4;
                localValues.push(getGrayValue(localIndex));
              }
            }
          }

          const localMean =
            localValues.reduce((sum, value) => sum + value, 0) /
            localValues.length;

          applyAdaptiveThreshold(pixelIndex, localMean);
        }
      }
      break;
  }

  ctx.putImageData(imageData, 0, 0);
};
