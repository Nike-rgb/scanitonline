/* eslint-disable @next/next/no-img-element */
import MyButton from "@/components/Button";
import Colors from "@/theme/Colors";
import { Heading } from "@/theme/Typography";
import { IconButton } from "@mui/material";
import Image from "next/image";
import React, { useState, useRef } from "react";
import CropIcon from "@mui/icons-material/Crop";
import CheckIcon from "@mui/icons-material/Check";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import "react-image-crop/dist/ReactCrop.css";
import { addImage, setEditorImage } from "@/redux/image_slice";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useRouter } from "next/router";

const Editor = (props: { fromMenu?: boolean }) => {
  const dispatch = useDispatch();
  const img = useSelector((state: RootState) => state.images.editorImage);
  const router = useRouter();
  const [cropper, setCropper] = useState<Cropper>();
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (typeof cropper !== "undefined") {
      const cropperCanvas = cropper.getCroppedCanvas();
      if (cropperCanvas === null) return;
      const src = cropperCanvas.toDataURL();
      dispatch(setEditorImage({ ...img, image: src }));
    }
  };

  const finishCrop = (onMenu: boolean) => {
    dispatch(addImage(img));
    const fromMenu = router.query.fromMenu;
    console.log(fromMenu === "true");
    router.back();
  };

  return (
    <main
      id="take"
      className="flex flex-col h-[100vh]"
      style={{
        backgroundImage: "url(/tiles.webp)",
        backgroundSize: "cover",
      }}>
      <div className="w-[100%] m-auto flex flex-col gap-4 justify-between">
        <Cropper
          className="cropper"
          src={img.image}
          initialAspectRatio={9 / 16}
          guides={true}
          ref={cropperRef}
          viewMode={1}
          minCropBoxHeight={50}
          minCropBoxWidth={50}
          autoCropArea={1}
          rotatable={true}
          scalable={true}
          draggable={true}
          zoomable={true}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />

        <div className="flex justify-center gap-4 mt-6">
          <MyButton icon={<CropIcon />} onClick={handleCrop}>
            Crop
          </MyButton>
          <MyButton icon={<CheckIcon />} onClick={finishCrop}>
            Done
          </MyButton>
        </div>
      </div>
    </main>
  );
};

export default Editor;
