import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { useContext } from "react";
import CreateMember from "../components/CreateMember";
import CreateProposal from "../components/CreateProposal";
import ProposalCard from "../components/ProposalCard";
import VoteModal from "../components/VoteModal";
import { DataContext } from "../contexts/dataContext";

export default function Home() {
  const { isMember, loading, account } = useContext(DataContext);

  const test = {
    title: "Proposed Proposal",
    description:
      "And here is the text that would outline what this proposal is all about. There would ideally be a fair amount of information here, so this would make the modal expand to be quite large.",
    id: "1",
    amount: "50",
    proposer: "0x000f0as0df00asf0as0df",
  };

  return (
    <Center>
      <Head>
        <title>Funding DAO</title>
      </Head>

      {!isMember && <CreateMember />}
    </Center>
  );
}
