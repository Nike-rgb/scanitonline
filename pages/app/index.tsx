import Colors from "@/theme/Colors";
import { Heading, Regular } from "@/theme/Typography";
import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import ImageInputButtonGroup from "@/components/ImageInput";
import { clearLocalImages, getLocalImages } from "@/lib/local_save";
import { imageType } from "@/redux/types";
import MyDialogBox from "@/components/MyDialogBox";
import MyButton from "@/components/Button";
import CheckIcon from "@mui/icons-material/Check";
import DashBoard from "@/components/dashboard";
import { loadLocalImages } from "@/redux/image_slice";

export default function App() {
  const router = useRouter();
  const dispatch = useDispatch();
  const imagesLength = useSelector(
    (state: RootState) => state.images.images.length
  );

  const [loadImageDialogShown, setLoadImageDialogShown] = React.useState(false);

  const [localImages, setLocalImages] = React.useState<imageType[]>([]);
  const loadImageConfirm = () => {
    setLoadImageDialogShown(false);
    dispatch(loadLocalImages(localImages));
  };

  const loadImageDiscard = async () => {
    setLoadImageDialogShown(false);
    await clearLocalImages();
  };

  useEffect(() => {
    if (imagesLength > 0) {
    }
  }, [imagesLength, router]);

  useEffect(() => {
    (async function () {
      try {
        const images = (await getLocalImages()) as imageType[];
        if (images.length > 0) {
          console.log("images", images);
          setLocalImages(images);
          setLoadImageDialogShown(true);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {imagesLength === 0 ? (
        <main className="p-6 flex flex-col h-[100vh]">
          <MyDialogBox
            open={loadImageDialogShown}
            title={
              "You left last time without downloading your PDF. Load those images?"
            }
            content={"These images are saved locally and not sent anywhere."}
            actions={
              <>
                <MyButton icon={<CheckIcon />} onClick={loadImageConfirm}>
                  Ok
                </MyButton>
                <Button
                  sx={{ textTransform: "none" }}
                  variant="text"
                  onClick={loadImageDiscard}>
                  <Regular>Discard</Regular>
                </Button>
              </>
            }
          />

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
                  <Image src="/doc.png" width={14} height={20} alt="docs" />
                }
                variant="text">
                <Regular>Docs</Regular>
              </Button>
            </div>
          </nav>

          <section className="flex flex-1 flex-col justify-center items-center">
            <div className="flex flex-col gap-4 items-center">
              <Image
                src="/landing.png"
                width={140}
                height={140}
                priority
                alt="ScanItOnline"
              />
              <Heading>Scan Documents Now</Heading>
              <Regular>
                <div className="text-center">
                  Select one of the options below to get started.
                </div>
              </Regular>
              <div className="flex gap-4 justify-between">
                <ImageInputButtonGroup />
              </div>
            </div>
          </section>

          <footer className="self-end fixed bottom-2">
            <Heading size={12}>
              <div className="flex gap-2 items-center">
                <span className="underline">
                  Click here to install. No internet needed.
                </span>
                <SaveAltIcon sx={{ color: Colors.secondary, fontSize: 16 }} />
              </div>
            </Heading>
          </footer>
        </main>
      ) : (
        <DashBoard />
      )}
    </>
  );
}
