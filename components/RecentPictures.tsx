import Colors from "@/theme/Colors";
import { Heading, Regular } from "@/theme/Typography";
import Link from "next/link";
import ImageTile from "./ImageTile";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import { Button } from "@mui/material";

export default function RecentPictures() {
  const lastThreeSelector = createSelector(
    (state: RootState) => state.images.images,
    (images) => ({ imgs: images.slice(-3).reverse(), length: images.length })
  );
  const { imgs, length } = useSelector(lastThreeSelector);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>
          <span className="md:text-xl">Recent Pictures</span>
        </Heading>
        <Regular color={Colors.primary}>
          <Button
            sx={{
              color: Colors.primary,
              textTransform: "none",
              fontSize: 14,
              fontWeight: 400,
            }}>
            <Link href="/app/images">
              <span className="md:text-md">View All</span>
            </Link>
          </Button>
        </Regular>
      </div>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}>
        <div className="grid grid-cols-3 gap-4 mt-6 items-center justify-items-center ">
          {imgs.map((item, index) => (
            <ImageTile
              key={index}
              img={item}
              position={length - index - 1}
              alt={`image_${index}`}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}
