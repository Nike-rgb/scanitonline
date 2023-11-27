import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { ThemeProvider, createTheme } from "@mui/material";
import Colors from "@/theme/Colors";

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {" "}
      <ThemeProvider theme={theme}>
        <DndProvider backend={TouchBackend}>
          <Component className={inter.className} {...pageProps} />
        </DndProvider>
      </ThemeProvider>
    </Provider>
  );
}
