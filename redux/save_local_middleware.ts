import { Middleware } from "redux";
import { debouncedSaveImagesLocally } from "@/lib/local_save";
import { addImage, clearAllImages, removeImage, reorder } from "./image_slice";

const saveToLocalMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const result = next(action);
    try {
      if (
        action.type === addImage.type ||
        action.type === removeImage.type ||
        action.type === reorder.type ||
        action.type === clearAllImages.type
      ) {
        await debouncedSaveImagesLocally(store.getState().images.images);
      }
      return result;
    } catch (err) {
      console.log(err);
      return result;
    }
  };

export default saveToLocalMiddleware;
