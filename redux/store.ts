import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./image_slice";
import saveToLocalMiddleware from "./save_local_middleware";
export const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
  middleware: [saveToLocalMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
