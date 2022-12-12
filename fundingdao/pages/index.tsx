import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { useContext } from "react";
import CreateMember from "../components/CreateMember";
import CreateProposal from "../components/CreateProposal";
import { DataContext } from "../contexts/dataContext";

export default function Home() {
  const { isMember, loading, account } = useContext(DataContext);

  return (
    <Center>
      <Head>
        <title>Funding DAO</title>
      </Head>

      {!isMember && <CreateMember />}
    </Center>
  );
}
