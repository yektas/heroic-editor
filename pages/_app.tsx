import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/paraiso-light.css";
import "../styles/globals.css";
import "../styles/markdown.css";
import type { AppProps } from "next/app";
import SocketProvider from "../context/socketContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <Toaster />
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
