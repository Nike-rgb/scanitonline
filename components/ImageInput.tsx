import { takeImgInput } from "@/lib/image_input";
import MyButton from "./Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FolderIcon from "@mui/icons-material/Folder";
import { useDispatch } from "react-redux";
import { setEditorImage } from "@/redux/image_slice";
import { useRouter } from "next/router";

export default function ImageInputButtonGroup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const setEditorImageCamera = async () => {
    const img = await takeImgInput("camera");
    dispatch(
      setEditorImage({
        timestamp: Date.now(),
        image: img,
      })
    );
    router.push("/app/editor");
  };

  const setEditorImageFiles = async () => {
    const img = await takeImgInput("files");
    dispatch(
      setEditorImage({
        timestamp: Date.now(),
        image: img,
      })
    );
    router.push("/app/editor");
  };

  return (
    <>
      <MyButton icon={<CameraAltIcon />} onClick={setEditorImageCamera}>
        Camera
      </MyButton>
      <MyButton icon={<FolderIcon />} onClick={setEditorImageFiles}>
        Open Files
      </MyButton>
    </>
  );
}
