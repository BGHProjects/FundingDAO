import { Center, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useContext } from "react";
import CreateMember from "../components/CreateMember";
import ProposalList from "../components/ProposalList";
import { DataContext } from "../contexts/dataContext";

export default function Home() {
  const { isMember, loading, account } = useContext(DataContext);

  return (
    <Center>
      <Head>
        <title>Funding DAO</title>
      </Head>
      {loading && (
        <Text fontWeight="bold" color="white">
          Loading...
        </Text>
      )}
      {!account && (
        <Text fontWeight="bold" color="white">
          Please connect Metamask Wallet
        </Text>
      )}

      {!loading && account && !isMember && <CreateMember />}
      {!loading && account && isMember && <ProposalList />}
    </Center>
  );
}
