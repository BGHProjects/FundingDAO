import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Flex, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DataContextProvider } from "../contexts/dataContext";
import Navbar from "../components/Navbar";
import { mainBG } from "../consts/colours";

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    components: {
      Text: {
        baseStyle: {
          fontFamily: "verdana",
        },
      },
      Button: {
        baseStyle: {
          fontFamily: "verdana",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <DataContextProvider>
        <Navbar />
        <Flex w="full" h="1000px" bg={mainBG} flexDirection="column">
          <Component {...pageProps} />
        </Flex>
      </DataContextProvider>
    </ChakraProvider>
  );
}
