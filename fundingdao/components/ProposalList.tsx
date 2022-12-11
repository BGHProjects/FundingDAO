import { Center, Text, HStack } from "@chakra-ui/layout";
import Link from "next/link";
import { useContext, useState } from "react";
import { blueSecondary } from "../consts/colours";
import { DataContext, IProposal } from "../contexts/dataContext";

const ProposalList = () => {
  const { allProposals, isMember, isStakeholder } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [proposal, setProposal] = useState<IProposal | null>(null);

  return (
    <Center>
      <Text fontSize="24px">
        {isMember && !isStakeholder ? "My Proposal" : "All Proposals"}
      </Text>
      <HStack spacing={15}>
        {allProposals.length === 0 && (
          <Text fontSize="24px">
            Sorry, you have no proposals yet. Create one{" "}
            <Link href="/create-proposal">
              <Text color={blueSecondary}>now!</Text>
            </Link>
          </Text>
        )}
        {allProposals.map((proposal) => (
          <></>
        ))}
      </HStack>
    </Center>
  );
};

export default ProposalList;
