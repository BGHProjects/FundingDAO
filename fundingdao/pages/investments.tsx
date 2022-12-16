import { Center, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useContext } from "react";
import ProposalInvestmentCard from "../components/ProposalInvestmentCard";
import { DataContext } from "../contexts/dataContext";

export default function Home() {
  const { allInvestedProposals, loading, account } = useContext(DataContext);

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
      {!loading &&
        account &&
        (allInvestedProposals.length === 0 ? (
          <Text>Sorry, you have not voted on any proposals yet</Text>
        ) : (
          <Flex w="100%" overflow="auto" p="50px">
            {allInvestedProposals.map((proposal) => (
              <ProposalInvestmentCard
                key={proposal.id}
                proposal={proposal}
                openModal={() => {}}
              />
            ))}
          </Flex>
        ))}
    </Center>
  );
}
