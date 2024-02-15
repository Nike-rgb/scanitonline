import { takeImgInput } from "@/lib/image_input";
import MyButton from "./Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FolderIcon from "@mui/icons-material/Folder";
import { useDispatch, useSelector } from "react-redux";
import { setEditorImage, setProcessing } from "@/redux/image_slice";
import { useRouter } from "next/router";

export default function ImageInputButtonGroup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const processing = useSelector((state: any) => state.images.processing);

  const setEditorImageCamera = async () => {
    dispatch(setProcessing(true));
    const img = await takeImgInput("camera");
    dispatch(
      setEditorImage({
        timestamp: Date.now(),
        image: img,
      })
    );
    dispatch(setProcessing(false));
    router.push("/app/editor");
  };

  const setEditorImageFiles = async () => {
    dispatch(setProcessing(true));
    const img = await takeImgInput("files");
    dispatch(
      setEditorImage({
        timestamp: Date.now(),
        image: img,
      })
    );
    dispatch(setProcessing(false));
    router.push("/app/editor");
  };

  return (
    <>
      <MyButton
        disabled={processing}
        icon={<CameraAltIcon />}
        onClick={setEditorImageCamera}>
        Camera
      </MyButton>
      <MyButton
        disabled={processing}
        icon={<FolderIcon />}
        onClick={setEditorImageFiles}>
        Open Files
      </MyButton>
    </>
  );
}
