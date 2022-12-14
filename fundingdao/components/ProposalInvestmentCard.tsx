import { Center, chakra, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useTimer } from "react-timer-hook";
import {
  blueSecondary,
  greenBG,
  greenFG,
  lightgreyBG,
  redBG,
  redFG,
} from "../consts/colours";
import { DataContext } from "../contexts/dataContext";
import { parseEther } from "../helpers";
import AddFundsModal from "./AddFundsModal";
import { IProposalCard } from "./ProposalCard";

const ProposalInvestmentCard = ({ proposal, openModal }: IProposalCard) => {
  const { isStakeholder, getProposal, releaseFunding } =
    useContext(DataContext);

  const [isOpen, setIsOpen] = useState(false);

  const proposalExpiryDate = new Date(
    parseInt(proposal.livePeriod as string) * 1000
  );

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: proposalExpiryDate,
    onExpire: () => console.log("onExpire called"),
  });
  const isCompleted = proposalExpiryDate < new Date();
  console.log("isCompleted", isCompleted);

  const handleCardClick = async () => {
    if (isStakeholder) {
      await getProposal(proposal.id as string);
      openModal();
    }
  };

  const passed =
    parseInt(proposal.votesInFavour as string) >
    parseInt(proposal.votesAgainst as string);

  const fundRaised =
    parseInt(proposal.totalFundsRaised as string) >= parseInt(proposal.amount);

  return (
    <>
      <Center onClick={() => handleCardClick()} w="800px">
        <ContentVStack spacing={5}>
          <Text fontWeight="bold" color="grey" alignSelf="flex-start">
            Proposal - #{parseInt((proposal.id as string) + 1)}
          </Text>
          <HStack justifyContent="space-between" w="full">
            <Text fontWeight="bold">{proposal.title}</Text>
            <Center p="5px" borderRadius="5px" bg={blueSecondary}>
              <Text color="white">Voting Period</Text>
            </Center>
          </HStack>
          <Text>{proposal.description}</Text>
          <HStack alignItems="center" justifyContent="flex-start" w="full">
            <Text>Proposer:</Text>
            <Center borderRadius="5px" p="3px" bg={lightgreyBG}>
              <Text color={blueSecondary}>{proposal.proposer}</Text>
            </Center>
          </HStack>
          <Text fontWeight="bold">
            {isCompleted && passed
              ? `Total Funding Received - ${proposal.totalFundsRaised} MATIC`
              : "REJECTED"}
          </Text>
          {!proposal.isPaid && isCompleted && (
            <Button onClick={() => setIsOpen(true)} bg={blueSecondary} w="full">
              <Text color="white" fontWeight="bold">
                Add Funds
              </Text>
            </Button>
          )}
          {!proposal.isPaid && isCompleted && fundRaised && (
            <Button
              onClick={async () => await releaseFunding(proposal.id as string)}
              bg={blueSecondary}
              w="full"
            >
              <Text color="white" fontWeight="bold">
                Release Funding
              </Text>
            </Button>
          )}
          {proposal.isPaid && (
            <Text fontWeight="bold">
              Funds have been release to the Proposer
            </Text>
          )}
          {!isCompleted && (
            <HStack w="full" justifyContent="space-between">
              <VStack alignItems="flex-start">
                <Text>Time</Text>
                <Text fontWeight="bold">
                  {isCompleted
                    ? "Voting period is over"
                    : `${days} days ${hours}:${minutes}:${seconds}`}
                </Text>
              </VStack>
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
            </HStack>
          )}
        </ContentVStack>
      </Center>
      <AddFundsModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        id={proposal.id as string}
        fundingRequired={(
          Number(parseEther(proposal.amount)) -
          Number(parseEther(proposal.totalFundsRaised as string))
        ).toString()}
        fundingRaised={parseEther(proposal.totalFundsRaised as string)}
      />
    </>
  );
};

const ContentVStack = chakra(VStack, {
  baseStyle: {
    borderRadius: "10px",
    p: "20px",
    justifyContent: "center",
    border: `2px solid ${blueSecondary}`,
  },
});

export default ProposalInvestmentCard;
