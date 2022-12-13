import { Center } from "@chakra-ui/react";
import Head from "next/head";

import CreateProposal from "../components/CreateProposal";

export default function Home() {
  return (
    <Center p="50px">
      <Head>
        <title>Funding DAO</title>
      </Head>
      <CreateProposal />
    </Center>
  );
}
