import RecentPictures from "@/components/RecentPictures";
import Colors from "@/theme/Colors";
import { Heading, Regular } from "@/theme/Typography";
import { Button, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import HelpIcon from "@mui/icons-material/Help";
import MyTextField from "@/components/MyTextField";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ImageInputButtonGroup from "@/components/ImageInput";
import createPDF from "@/lib/pdf_from_images";
import { useSelector } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import CollectionsIcon from "@mui/icons-material/Collections";
import DescriptionIcon from "@mui/icons-material/Description";
import { clearLocalImages } from "@/lib/local_save";
import createZipAndDownload from "@/lib/zip_image_arrary";
import { imageType } from "@/redux/types";

export default function DashBoard() {
  const router = useRouter();
  const images = useSelector((state: any) => state.images.images);
  const [fileName, setFileName] = React.useState("Made with ScanItOnline");
  const [filterType, setFilterType] = React.useState("none");
  const [openContrastTip, setOpenContrastTip] = React.useState(false);
  const [openAttributionTip, setOpenAttributionTip] = React.useState(false);

  useEffect(() => {
    if (images.length === 0) {
      router.replace("/app");
    }
  }, [images, router]);

  const exportPDF = async () => {
    await createPDF(images, fileName, filterType);
    clearLocalImages();
  };

  const exportImages = async () => {
    const base64Array = images.map((img: imageType) => img.image);
    await createZipAndDownload(base64Array, fileName);
  };

  const toggleGrayscale = () => {
    setFilterType((prev) => {
      if (prev !== "grayscale") return "grayscale";
      return "none";
    });
  };

  const toggleHighContrast = () => {
    setFilterType((prev) => {
      if (prev !== "highContrast") return "highContrast";
      return "none";
    });
  };

  const toggleContrastTip = () => {
    setOpenContrastTip(true);
    setTimeout(() => {
      setOpenContrastTip(false);
    }, 4000);
  };

  const toggleAttributionTip = () => {
    setOpenAttributionTip(true);
    setTimeout(() => {
      setOpenAttributionTip(false);
    }, 4000);
  };

  return (
    <>
      <main className="p-6 flex flex-col h-[100vh] lg:px-12">
        <nav>
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2 items-center">
              <Image src="/logo.png" width={45} height={45} alt="logo" />
              <h1>
                <Heading color={Colors.primary}>
                  <span className="md:text-2xl">ScanItOnline</span>
                </Heading>
              </h1>
            </div>
            <IconButton>
              <SaveAltIcon sx={{ color: Colors.secondary }} />
            </IconButton>
          </div>
        </nav>

        <section className="mt-2 mb-2 md:mt-10">
          <RecentPictures />
        </section>

        <div className="md:flex md:flex-row md:justify-between md:items-center md:mt-10">
          <section className="my-2">
            <Heading>
              <span className="md:text-xl">Add More</span>
            </Heading>
            <div className="flex gap-4 mt-4 md:mt-6">
              <ImageInputButtonGroup />
            </div>
          </section>

          <section className="my-4 md:min-w-[500px]">
            <Heading>
              <span className="md:text-xl">Settings</span>
            </Heading>
            <div className="mt-4 grid grid-cols-2 gap-1">
              <div className="flex gap-1 items-center">
                <Checkbox
                  checked={filterType === "grayscale"}
                  onClick={toggleGrayscale}
                />

                <Regular>Grayscale</Regular>
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox
                  checked={filterType === "highContrast"}
                  onClick={toggleHighContrast}
                />
                <Regular>Contrast</Regular>
                <Tooltip
                  arrow
                  open={openContrastTip}
                  title="Enhance the readibility of texts in your documents. Make sure the photos are well-lit and do not contain shadows">
                  <IconButton onClick={toggleContrastTip}>
                    <HelpIcon
                      style={{ color: Colors.secondary, fontSize: 22 }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <Checkbox checked={true} sx={{ color: Colors.primary }} />
              <Regular>
                <span className="text-center">Attribute Us?</span>
              </Regular>
              <Tooltip
                arrow
                open={openAttributionTip}
                title="We would love it if you could attribute us when you share your documents.">
                <IconButton onClick={toggleAttributionTip}>
                  <HelpIcon
                    sx={{ color: Colors.secondary, fontSize: 22 }}
                    fontSize="small"
                  />
                </IconButton>
              </Tooltip>
            </div>
          </section>
        </div>

        <section className="my-4 md:mt-10">
          <Heading>
            <span className="md:text-xl">File Name</span>
          </Heading>
          <div className="flex gap-1 items-end mt-4">
            <MyTextField
              name="filename"
              borderColor={Colors.secondary}
              placeholder={fileName}
              onChange={(value: string) => {
                setFileName(value);
              }}
            />
            <Regular color={Colors.primary}>.pdf</Regular>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-3 item-center justify-items-center max-w-[500px]">
          <FooterButton
            onClick={() => {
              router.push("/app/images");
            }}
            Icon={<ImageIcon style={{ color: Colors.secondary }} />}>
            Your Images
          </FooterButton>
          <FooterButton
            onClick={exportPDF}
            Icon={
              <DescriptionIcon
                style={{ color: Colors.secondary, fontSize: 24 }}
              />
            }>
            Export PDF
          </FooterButton>
          <FooterButton
            onClick={exportImages}
            Icon={<CollectionsIcon style={{ color: Colors.secondary }} />}>
            Export Images
          </FooterButton>
        </section>
      </main>
    </>
  );
}

interface FooterButtonProps {
  children: React.ReactNode;
  Icon: React.ReactNode;
  onClick: Function;
}

const FooterButton = (props: FooterButtonProps) => (
  <>
    <Button
      className="footer_btn"
      sx={{
        width: "80%",
        maxWidth: 100,
        backgroundColor: Colors.white,
        "&:hover": {
          backgroundColor: Colors.white,
        },
      }}
      variant="contained"
      onClick={() => {
        props.onClick();
      }}>
      <div className="flex flex-col gap-2 items-center p-2 capitalize">
        {props.Icon}
        <Regular size={12} weight={400} color={Colors.secondary}>
          {props.children}
        </Regular>
      </div>
    </Button>
  </>
);
