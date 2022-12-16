import { Center, Text, HStack } from "@chakra-ui/layout";
import Link from "next/link";
import { useContext, useState } from "react";
import { blueSecondary } from "../consts/colours";
import { DataContext, IProposal } from "../contexts/dataContext";
import ProposalCard from "./ProposalCard";
import VoteModal from "./VoteModal";

const ProposalList = () => {
  const { allProposals, isMember, isStakeholder } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [proposal, setProposal] = useState<IProposal | null>(null);

  return (
    <>
      <Center flexDirection="column">
        <Text fontSize="24px" color="white" mb="20px">
          {isMember && !isStakeholder ? "My Proposal" : "All Proposals"}
        </Text>
        <HStack spacing={15}>
          {allProposals.length === 0 && (
            <Text fontSize="24px" color="white">
              Sorry, you have no proposals yet. Create one{" "}
              <Link href="/create-proposal">
                <Text color={blueSecondary}>now!</Text>
              </Link>
            </Text>
          )}
          {allProposals.map((proposal) => (
            <ProposalCard
              key={JSON.stringify(proposal)}
              proposal={proposal}
              openModal={() => {
                setIsOpen(true);
                setProposal(proposal);
              }}
            />
          ))}
        </HStack>
      </Center>
      <VoteModal
        isOpen={isOpen}
        proposal={proposal}
        closeModal={() => setIsOpen(false)}
      />
    </>
  );
};

export default ProposalList;
