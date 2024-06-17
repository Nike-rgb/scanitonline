import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PWAState {
  installable: boolean;
  pwaInstalled: boolean;
  defferedPrompt: any;
}

const initialState: PWAState = {
  installable: false,
  pwaInstalled: false,
  defferedPrompt: null,
};

export const PWASlice = createSlice({
  name: "pwa",
  initialState,
  reducers: {
    setInstallable: (state, action: PayloadAction<boolean>) => {
      state.installable = action.payload;
    },
    setPWAInstalled: (state, action: PayloadAction<boolean>) => {
      state.pwaInstalled = action.payload;
    },
    setDeferredPrompt: (state, action: PayloadAction<any>) => {
      state.defferedPrompt = action.payload;
    },
  },
});

export const { setInstallable, setPWAInstalled, setDeferredPrompt } =
  PWASlice.actions;

export default PWASlice.reducer;
