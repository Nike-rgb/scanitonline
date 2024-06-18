import Image from "next/image";
import Head from "next/head";
import { Regular } from "@/theme/Typography";
import Colors from "@/theme/Colors";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckIcon from "@mui/icons-material/Check";
import styles from "@/styles/index.module.css";
import { useRouter } from "next/router";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setDeferredPrompt, setPWAInstalled } from "@/redux/pwa_states";
import MyButton from "@/components/Button";

export default function Home() {
  const [device, setDevice] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const installable = useSelector((state: RootState) => state.pwa.installable);
  const pwaInstalled = useSelector(
    (state: RootState) => state.pwa.pwaInstalled
  );
  const deferredPrompt = useSelector(
    (state: RootState) => state.pwa.defferedPrompt
  );
  const navigateToApp = () => {
    router.push("/app");
  };

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

  const returnPlatform = async () => {
    if (typeof window !== "undefined") {
      const platform = await import("platform");
      const os = platform.os?.family;

      if (os === "IOS") {
        return "ios";
      } else if (os === "Android") {
        return "Android";
      } else if (os === "Windows") {
        return "Windows";
      } else if (os === "OS X" || os === "Mac OS") {
        return "Mac";
      } else if (os === "Linux" || os === "Ubuntu" || os === "Debian") {
        return "Linux";
      }
    }
    return "device";
  };

  useEffect(() => {
    (async function () {
      const os = await returnPlatform();
      setDevice(os);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>ScanItOnline | Scan documents online</title>
        <meta property="og:title" content="ScanItonline" key="title" />
        <meta name="description" content="Scan documents online on the web" />
      </Head>

      <main>
        <section className="py-8 px-6">
          <div className="px-16 flex max-sm:px-0">
            <Image src="/logo.png" alt="ScanItOnline" width={40} height={40} />
          </div>

          <div className="pl-24 mt-2 grid grid-cols-9 gap-6 items-center max-sm:block max-sm:pl-0">
            <div className="col-span-5 flex flex-col items-start gap-6">
              <h1
                className="uppercase tracking-wide max-sm:leading-5"
                style={{ lineHeight: "4rem" }}>
                <span
                  className={styles.hero_text}
                  style={{
                    fontSize: "2rem",
                    fontWeight: 500,
                    color: Colors.secondary,
                  }}>
                  <span
                    className={styles.bigger}
                    style={{ color: Colors.primary, fontSize: "3.5rem" }}>
                    Scan
                  </span>{" "}
                  your{" "}
                  <span
                    className={styles.bigger}
                    style={{ color: Colors.primary, fontSize: "3.5rem" }}>
                    documents
                  </span>{" "}
                  <br></br>{" "}
                  <span
                    className="md:ml-3"
                    style={{
                      color: Colors.primary,
                      display: "inline-block",
                    }}>
                    online
                  </span>{" "}
                  with ScanItOnline
                </span>
              </h1>
              <Regular size={18} weight={450}>
                <span className="ml-2 max-sm:ml-0">Star it on</span>{" "}
                <Button
                  id="github-button"
                  variant="contained"
                  onClick={() => {
                    window.open(
                      "https://github.com/Nike-rgb/scanitonline",
                      "_blank"
                    );
                  }}
                  endIcon={
                    <Image
                      src="/github-mark/github-mark-white.svg"
                      alt="Github"
                      width={20}
                      height={20}
                    />
                  }
                  sx={{
                    marginLeft: 1,
                    borderRadius: "12px",
                    textTransform: "none",
                    backgroundColor: Colors.secondary,
                    "&:hover": {
                      backgroundColor: Colors.secondary,
                      opacity: 0.9,
                    },
                  }}>
                  Github
                </Button>
              </Regular>
              <div className="w-[60%] max-sm:w-full">
                <Regular size={18} weight={350}>
                  <span className={styles.regular}>
                    Tired of apps taking up space on your phone? No need to
                    download anything. Scan your documents right away!
                  </span>
                </Regular>
              </div>
              <Button
                className="my_button"
                variant="contained"
                sx={{
                  borderRadius: "12px",
                  gap: 2,
                  paddingY: 1,
                }}
                onClick={navigateToApp}
                endIcon={<CameraAltIcon />}>
                SCAN NOW
              </Button>
              <div className="flex gap-8 items-start max-sm:grid max-sm:grid-cols-2">
                <div className="flex gap-2 items-center">
                  <CheckIcon sx={{ color: Colors.success }} />
                  <Regular>
                    <span className={styles.regular}>FULLY OFFLINE</span>
                  </Regular>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckIcon sx={{ color: Colors.success }} />
                  <Regular>
                    <span className={styles.regular}>SERVERLESS</span>
                  </Regular>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckIcon sx={{ color: Colors.success }} />
                  <Regular>AUTO-SAVE</Regular>
                </div>
              </div>
            </div>

            <div className="col-span-4 max-sm:hidden">
              <Image
                style={{ height: 700 }}
                src="/Hero picture.svg"
                alt="ScanItOnline"
                width={600}
                height={600}
              />
            </div>
          </div>
        </section>

        <section
          className="px-6 py-16 md:px-16"
          style={{ background: "#2C2A2A" }}>
          <div className="text-white text-xl font-bold md:text-4xl">
            Featuring
          </div>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-10 mt-16 md:gap-16">
            <div className="flex gap-6 flex-col items-center text-white max-sm:gap-3">
              <WifiOffIcon sx={{ color: Colors.white, fontSize: 60 }} />
              <span className="md:text-2xl font-semibold">FULLY OFFLINE</span>
              <span style={{ textAlign: "center" }} className={styles.regular}>
                The app is capable of running fully offline as a full-fetched
                PWA. Not a single piece of data is sent anywhere.
              </span>
            </div>

            <div className="flex gap-6 flex-col items-center text-white max-sm:gap-3">
              <PhoneAndroidIcon sx={{ color: Colors.white, fontSize: 60 }} />
              <span className="md:text-2xl font-semibold">NATIVE FEEL</span>
              <span style={{ textAlign: "center" }} className={styles.regular}>
                Although the app is a web app, it feels just like a native app.
                It is fast, and can be installed on your device.
              </span>
            </div>

            <div className="flex gap-6 flex-col items-center text-white max-sm:gap-3">
              <SdStorageIcon sx={{ color: Colors.white, fontSize: 60 }} />
              <span className="md:text-2xl font-semibold">LESS THAN 1MB</span>
              <span style={{ textAlign: "center" }} className={styles.regular}>
                The app is less than 1MB in size, and can be downloaded and
                installed in seconds. Forget about apps taking up space on your
                phone.
              </span>
            </div>

            <div className="flex gap-6 flex-col items-center text-white max-sm:gap-3">
              <PeopleIcon sx={{ color: Colors.white, fontSize: 60 }} />
              <span className="md:text-2xl font-semibold">OPEN SOURCE</span>
              <span style={{ textAlign: "center" }} className={styles.regular}>
                The app is open source, and is available on Github. Feel free to
                contribute to the project.
              </span>
            </div>
          </div>
        </section>

        <section className="px-6 py-6 mt-8 md:mt-16 md:px-16 md:w-[70%] mx-auto">
          <div className="grid grid-cols-2 gap-10">
            <Image
              src="/Footer picture.svg"
              alt="ScanItOnline"
              width={300}
              height={400}
            />
            <div className="flex items-start flex-col gap-6 justify-center md:gap-10">
              <span className="font-semibold md:text-4xl">Ready to start?</span>
              <Link href="/app" className="underline">
                <span className={styles.regular}>
                  <span className="md:text-xl">Get started on the browser</span>
                </span>
              </Link>
              {installable && !pwaInstalled && (
                <>
                  <MyButton icon={null} onClick={installPwa}>
                    <span
                      className="md:text-md cursor-pointer"
                      onClick={installPwa}>
                      Install on your {device}
                    </span>
                  </MyButton>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
