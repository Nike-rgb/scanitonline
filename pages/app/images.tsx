import Colors from "@/theme/Colors";
import { Heading, Regular } from "@/theme/Typography";
import { IconButton } from "@mui/material";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageTile from "@/components/ImageTile";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

export default function ImageMenu() {
  const router = useRouter();
  const images = useSelector((state: RootState) => state.images.images);

  const back = () => {
    router.back();
  };

  return (
    <>
      <main className="p-8 flex flex-col h-[100vh]">
        <nav>
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2 items-center">
              <Image src="/logo.png" width={45} height={45} alt="logo" />
              <h1>
                <Heading color={Colors.primary}>ScanItOnline</Heading>
              </h1>
            </div>

            <IconButton>
              <SaveAltIcon sx={{ color: Colors.secondary }} />
            </IconButton>
          </div>
        </nav>

        <section className="mt-4">
          <div className="flex gap-4 items-center">
            <IconButton onClick={() => back()}>
              <ArrowBackIcon
                style={{ fontSize: 28, color: Colors.secondary }}
              />
            </IconButton>
            <Heading>Your Images</Heading>
          </div>

          <div className="my-2">
            <Regular>Try dragging the images around to rearrange</Regular>
          </div>
        </section>

        <section className="flex-1 mt-6 overflow-y-auto overflow-x-hidden">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
              {images.map((item, index) => (
                <ImageTile
                  fromMenu={true}
                  key={index}
                  position={index}
                  img={item}
                  alt={`image_${index}`}
                />
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
