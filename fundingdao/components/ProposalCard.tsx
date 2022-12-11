import { DataContext, IProposal } from "../contexts/dataContext";
import { useTimer } from "react-timer-hook";
import { useContext } from "react";
import { Center, VStack, HStack, Text, Flex } from "@chakra-ui/layout";
import { blueSecondary } from "../consts/colours";
import { parseEther } from "../helpers";

interface IProposalCard {
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

  const handleCardClick = () => {
    if (isStakeholder) {
      console.log("isStakeholder");
      openModal();
    }
  };

  return (
    <Center onClick={() => handleCardClick()}>
      <VStack
        borderRadius="10px"
        p="20px"
        spacing={5}
        justifyContent="center"
        border={`2px solid ${blueSecondary}`}
      >
        <HStack justifyContent="space-between">
          <Text>Proposal - #{parseInt(proposal.id + 1)}</Text>
          <Text as="span">
            Funding Amount -{" "}
            <Text as="span">{parseEther(proposal.amount)} MATIC</Text>
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>{proposal.title}</Text>
          <Center
            p="5px"
            borderRadius="5px"
            border={`2px solid ${blueSecondary}`}
          >
            <Text color="white">Voting Period</Text>
          </Center>
        </HStack>
        <Flex justifyContent="space-between">
          <Text>{proposal.description}</Text>
        </Flex>
        <HStack>
          <Text>
            Proposer:{" "}
            <Center borderRadius="5px" p="3px" bg="lightgrey">
              <Text color={blueSecondary}>{proposal.proposer}</Text>
            </Center>
          </Text>
        </HStack>
        <HStack>
          <VStack>
            <Text>Time</Text>
            {isCompleted ? (
              <Text>Voting period is over</Text>
            ) : (
              <Text>
                {days} days {hours}: {minutes}: {seconds}
              </Text>
            )}
          </VStack>
          {isCompleted ? (
            <Text>
              Proposal is{" "}
              {parseInt(proposal.votesInFavour as string) >
              parseInt(proposal.votesAgainst as string)
                ? "Accepted"
                : "Rejected"}
            </Text>
          ) : (
            <HStack spacing={10}>
              <VStack bg="lightGrey" borderRadius="10px">
                <Text color="white">In Favour</Text>
                <Text color="green">{proposal.votesInFavour}</Text>
              </VStack>
              <VStack bg="lightGrey" borderRadius="10px">
                <Text color="white">Against</Text>
                <Text color="red">{proposal.votesAgainst}</Text>
              </VStack>
            </HStack>
          )}
        </HStack>
      </VStack>
    </Center>
  );
};

export default ProposalCard;
