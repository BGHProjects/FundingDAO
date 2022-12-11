import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { DataContextProvider } from "../contexts/dataContext";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DataContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </DataContextProvider>
    </ChakraProvider>
  );
}
