import { addImage, setEditorImage } from "@/redux/image_slice";
import { RootState } from "@/redux/store";
import Colors from "@/theme/Colors";
import { Heading, Regular } from "@/theme/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CropIcon from "@mui/icons-material/Crop";
import { Button } from "@mui/material";
import Scanner from "document_crop";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "./Button";

const Cropper = () => {
  const dispatch = useDispatch();
  const img = useSelector((state: RootState) => state.images.editorImage);
  const router = useRouter();
  const [scanner, setScanner] = useState<Scanner | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scan = new Scanner({
      parent: divRef.current as HTMLDivElement,
      width: 300,
      maxHeight: 500,
      cornerRadius: 14,
      cornerColor: Colors.primary,
      //cropBoxBorderColor: Colors.white,
      //backdropColor: "rgba(40,40,40,0.5)",
      initialCorners: [
        { x: 15, y: 15 },
        { x: 85, y: 15 },
        { x: 85, y: 85 },
        { x: 15, y: 85 },
      ],
      minCropBoxWidth: 50,
      minCropBoxHeight: 50,
    });
    if (img.image) scan.loadImg(img.image);
    setScanner(scan);
    return () => {
      scan.destroy();
      setScanner(null);
    };
  }, [img.image]);

  const handleCrop = () => {
    if (scanner) {
      const src = scanner.crop();
      dispatch(setEditorImage({ ...img, image: src }));
    }
  };

  const finishCrop = (onMenu: boolean) => {
    dispatch(addImage(img));
    router.back();
  };

  return (
    <>
      <main className="p-6">
        <nav>
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2 items-center">
              <Image src="/logo.png" width={45} height={45} alt="logo" />
              <h1>
                <Heading color={Colors.primary}>ScanItOnline</Heading>
              </h1>
            </div>
            <Button
              sx={{ color: Colors.secondary, textTransform: "none" }}
              startIcon={
                <InfoOutlinedIcon
                  sx={{ color: Colors.secondary, fontSize: 16 }}
                />
              }
              variant="text"
              onClick={() => {}}>
              <Regular>About</Regular>
            </Button>
          </div>
        </nav>
        <section className="mt-6">
          <div className="min-h-[78vh] grid grid-rows-3 justify-center gap-4 items-center">
            <div className="row-span-4" ref={divRef}></div>
            <div className="self-end flex justify-center gap-4 mt-6">
              <MyButton icon={<CropIcon />} onClick={handleCrop}>
                Crop
              </MyButton>
              <MyButton icon={<CheckIcon />} onClick={finishCrop}>
                Done
              </MyButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Cropper;
