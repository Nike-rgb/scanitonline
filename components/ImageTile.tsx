import { IconButton, Paper, Tooltip } from "@mui/material";
import Image from "next/image";
import { imageType } from "@/redux/types";
import { useDispatch } from "react-redux";
import { removeImage, reorder, setEditorImage } from "@/redux/image_slice";
import { useRouter } from "next/router";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import Colors from "@/theme/Colors";
import CropIcon from "@mui/icons-material/Crop";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface ImageProps {
  img: imageType;
  alt: string;
  position: number;
}

//required type for drag and drop library
export const ItemTypes = {
  IMAGE: "image",
};

export default function ImageTile(props: ImageProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: props,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: (item: ImageProps) => {
      console.log("dragged", item.alt);
      console.log("dropped on", props.alt);
      dispatch(reorder({ from: item.position, to: props.position }));
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const edit = () => {
    dispatch(setEditorImage(props.img));
    router.push(`/app/editor`);
  };

  const remove = () => {
    dispatch(removeImage(props.img.timestamp));
  };

  return (
    <>
      <div
        ref={drop}
        className="flex flex-col gap-2 w-full items-center justify-between">
        <div
          className="rounded-lg w-full flex justify-center"
          style={{
            zIndex: isDragging ? -10 : 2,
            transition: "all 0.2s ease-in-out",
            transform:
              isOver && !isDragging ? `scale(1.09) translateY(30px)` : "none",
            cursor: isDragging ? "grabbing" : "move",
          }}>
          <motion.div drag draggable={true} dragSnapToOrigin={true}>
            <Paper
              ref={drag}
              className="rounded-lg w-[80px] h-[120px] relative md:w-[90px] md:h-[140px]"
              elevation={3}>
              <Image
                style={{
                  border:
                    isOver && !isDragging
                      ? `2px solid ${Colors.primary}`
                      : "none",
                }}
                src={props.img.image}
                className="rounded-lg"
                alt={props.alt}
                layout="fill"
                objectFit="cover"
              />
            </Paper>
          </motion.div>
        </div>

        <div className="flex gap-2">
          <Tooltip title="Crop" placement="bottom" arrow>
            <IconButton onClick={edit}>
              <CropIcon style={{ color: Colors.secondary, fontSize: 22 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" placement="bottom" arrow>
            <IconButton onClick={remove}>
              <DeleteOutlineOutlinedIcon
                style={{ color: Colors.secondary, fontSize: 22 }}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
