/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
const Cropper = dynamic(() => import("../../components/cropper"), {
  ssr: false,
});

const Editor = (props: { fromMenu: boolean }) => {
  return (
    <>
      <Cropper {...props} />
    </>
  );
};

export default Editor;
