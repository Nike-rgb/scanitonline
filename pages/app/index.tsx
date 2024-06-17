import Colors from "@/theme/Colors";
import { Heading, Regular } from "@/theme/Typography";
import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import React, { use, useEffect } from "react";
import ImageInputButtonGroup from "@/components/ImageInput";
import { clearLocalImages, getLocalImages } from "@/lib/local_save";
import { imageType } from "@/redux/types";
import MyDialogBox from "@/components/MyDialogBox";
import MyButton from "@/components/Button";
import CheckIcon from "@mui/icons-material/Check";
import DashBoard from "@/components/dashboard";
import { loadLocalImages } from "@/redux/image_slice";
import {
  setDeferredPrompt,
  setInstallable,
  setPWAInstalled,
} from "@/redux/pwa_states";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Fab from "@mui/material/Fab";
import Editor from "./editor";

export default function App() {
  const router = useRouter();
  const dispatch = useDispatch();
  const processing = useSelector((state: any) => state.images.processing);
  const imagesLength = useSelector(
    (state: RootState) => state.images.images.length
  );
  const installable = useSelector((state: RootState) => state.pwa.installable);
  const pwaInstalled = useSelector(
    (state: RootState) => state.pwa.pwaInstalled
  );
  const deferredPrompt = useSelector(
    (state: RootState) => state.pwa.defferedPrompt
  );

  const goToHomePage = () => {
    router.push("/");
  };

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
    const handleBeforeInstallPrompt = (e: any) => {
      console.log("before install prompt");
      e.preventDefault();
      dispatch(setInstallable(true));
      dispatch(setDeferredPrompt(e));
    };

    const handleAppInstalled = () => {
      dispatch(setPWAInstalled(true));
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [dispatch]);

  const installPwa = async () => {
    if (deferredPrompt) {
      console.log("installing pwa");
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        dispatch(setPWAInstalled(true));
      }
      dispatch(setDeferredPrompt(null));
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const images = (await getLocalImages()) as imageType[];
        if (images.length > 0) {
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
      <div style={{ opacity: 0, position: "absolute" }}>
        <Editor />
      </div>
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
                  <InfoOutlinedIcon
                    sx={{ color: Colors.secondary, fontSize: 16 }}
                  />
                }
                variant="text"
                onClick={goToHomePage}>
                <Regular>About</Regular>
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
            {installable && !pwaInstalled && (
              <Heading size={12}>
                <div
                  onClick={installPwa}
                  className="flex gap-2 items-center cursor-pointer">
                  <span className="underline">
                    Click here to install. No internet needed.
                  </span>
                  <SaveAltIcon sx={{ color: Colors.secondary, fontSize: 16 }} />
                </div>
              </Heading>
            )}
          </footer>
        </main>
      ) : (
        <DashBoard />
      )}
      {processing && (
        <Fab
          className="my_button loading_fab"
          sx={{ position: "absolute", top: 14, right: 14 }}
          size="medium"
          color="secondary"
          aria-label="add">
          <HourglassEmptyIcon />
        </Fab>
      )}
    </>
  );
}
