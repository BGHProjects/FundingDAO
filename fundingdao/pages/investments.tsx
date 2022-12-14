import { Center, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useContext } from "react";
import ProposalInvestmentCard from "../components/ProposalInvestmentCard";
import { DataContext } from "../contexts/dataContext";

export default function Home() {
  const { allInvestedProposals, loading, account } = useContext(DataContext);

  // const test = {
  //   title: "Proposed Proposal",
  //   description:
  //     "And here is the text that would outline what this proposal is all about. There would ideally be a fair amount of information here, so this would make the modal expand to be quite large.",
  //   id: "1",
  //   amount: "500000",
  //   proposer: "0x000f0as0df00asf0as0df",
  //   votesAgainst: 10,
  //   votesInFavour: 22,
  //   livePeriod: "5",
  //   totalFundsRaised: "5000",
  // };

  return (
    <Center>
      <Head>
        <title>Funding DAO</title>
      </Head>
      {loading && <Text fontWeight="bold">Loading...</Text>}
      {!account && (
        <Text fontWeight="bold">Please connect Metamask Wallet</Text>
      )}
      {!loading &&
        account &&
        (allInvestedProposals.length === 0 ? (
          <Text>Sorry, you have not voted on any proposals yet</Text>
        ) : (
          allInvestedProposals.map((proposal) => (
            <ProposalInvestmentCard
              key={proposal.id}
              proposal={proposal}
              openModal={() => {}}
            />
          ))
        ))}
    </Center>
  );
}
