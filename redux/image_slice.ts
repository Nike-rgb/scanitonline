import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { imageType } from "./types";

export interface ImagesState {
  editorImage: imageType;
  images: imageType[];
}

const initialState: ImagesState = {
  editorImage: { timestamp: 0, image: "" },
  images: [],
};

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    clearAllImages: (state) => {
      state.images = [];
    },
    loadLocalImages: (state, action: PayloadAction<imageType[]>) => {
      state.images = action.payload;
    },
    setEditorImage: (state, action: PayloadAction<imageType>) => {
      state.editorImage = action.payload;
    },
    addImage: (state, action: PayloadAction<imageType>) => {
      const index = state.images.findIndex(
        (image) => image.timestamp === action.payload.timestamp
      );
      if (index !== -1) {
        state.images[index] = action.payload;
        return;
      }
      state.images.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.images = state.images.filter(
        (image) => image.timestamp !== action.payload
      );
    },
    reorder: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const [removed] = state.images.splice(from, 1);
      state.images.splice(to, 0, removed);
    },
  },
});

export const {
  setEditorImage,
  addImage,
  removeImage,
  reorder,
  loadLocalImages,
  clearAllImages,
} = imageSlice.actions;

export default imageSlice.reducer;
