import { Center, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import { useContext } from "react";
import { useTimer } from "react-timer-hook";
import {
  blueSecondary,
  gradBG,
  greenBG,
  greenFG,
  redBG,
  redFG,
} from "../consts/colours";
import { DataContext, IProposal } from "../contexts/dataContext";
import { parseEther } from "../helpers";

export interface IProposalCard {
  proposal: IProposal;
  openModal: () => void;
}

const ProposalCard = ({ proposal, openModal }: IProposalCard) => {
  const proposalExpiryDate = new Date(
    parseInt(proposal.livePeriod as string) * 1000
  );

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: proposalExpiryDate,
    onExpire: () => console.log("onExpire called"),
  });

  const { isStakeholder, getProposal } = useContext(DataContext);
  const isCompleted = proposalExpiryDate < new Date();
  console.log("isCompleted", isCompleted);

  const handleCardClick = async () => {
    if (isStakeholder) {
      await getProposal(proposal.id as string);
      openModal();
    }
  };

  return (
    <Center onClick={() => handleCardClick()} w="800px" cursor="pointer">
      <VStack
        borderRadius="10px"
        p="20px"
        spacing={5}
        justifyContent="center"
        bgGradient={gradBG}
      >
        <HStack justifyContent="space-between" w="full">
          <Text fontWeight="bold" color="lightgrey">
            Proposal - #{parseInt(proposal.id as string)}
          </Text>
          <Text fontWeight="bold" color="lightgrey">
            Funding Amount - {parseEther(proposal.amount)} MATIC
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text fontWeight="bold" color="white" fontSize="20px">
            {proposal.title}
          </Text>
          <Center p="5px 10px" borderRadius="5px" bg={blueSecondary}>
            <Text color="white">Voting Period</Text>
          </Center>
        </HStack>
        <Flex justifyContent="space-between">
          <Text color="white">{proposal.description}</Text>
        </Flex>
        <HStack alignItems="center" justifyContent="flex-start" w="full">
          <Text color="white">Proposer:</Text>
          <Center borderRadius="5px" p="5px 10px" bg={blueSecondary}>
            <Text color="white" fontWeight="bold">
              {proposal.proposer}
            </Text>
          </Center>
        </HStack>
        <HStack w="full" justifyContent="space-between">
          <VStack alignItems="flex-start">
            <Text color="white">Time</Text>
            <Text fontWeight="bold" color="white">
              {isCompleted
                ? "Voting period is over"
                : `${days} days ${hours}:${minutes}:${seconds}`}
            </Text>
          </VStack>
          {isCompleted ? (
            <Text fontWeight="bold" color="white">
              Proposal is{" "}
              {parseInt(proposal.votesInFavour as string) >
              parseInt(proposal.votesAgainst as string)
                ? "Accepted"
                : "Rejected"}
            </Text>
          ) : (
            <HStack spacing={10}>
              <VStack bg={greenBG} borderRadius="10px" p="10px">
                <Text color={greenFG}>In Favour</Text>
                <Text color="black" fontWeight="bold">
                  {proposal.votesInFavour}
                </Text>
              </VStack>
              <VStack bg={redBG} borderRadius="10px" p="10px">
                <Text color={redFG}>Against</Text>
                <Text color="black" fontWeight="bold">
                  {proposal.votesAgainst}
                </Text>
              </VStack>
            </HStack>
          )}
        </HStack>
      </VStack>
    </Center>
  );
};

export default ProposalCard;
