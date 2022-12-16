import {
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  blueSecondary,
  gradBG,
  greenBG,
  greenFG,
  redBG,
  redFG,
} from "../consts/colours";
import { DataContext, IProposal } from "../contexts/dataContext";

interface IVoteModal {
  isOpen: boolean;
  closeModal: () => void;
  proposal?: IProposal | null;
}

const VoteModal = ({ isOpen, closeModal, proposal }: IVoteModal) => {
  const { allVotes, vote } = useContext(DataContext);

  const handleVote = async (decision: boolean) => {
    await vote(proposal?.id ?? "", decision);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="2xl">
      <ModalOverlay />
      <ModalContent bgGradient={gradBG}>
        <ModalHeader>
          <Text color="white">{proposal?.title}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="white">{proposal?.description}</Text>
          <Text mt="20px" color="white">
            Funding Amount - {proposal?.amount} MATIC
          </Text>
          <HStack mt="20px">
            <Text color="white">Proposer - </Text>
            <Center borderRadius="5px" p="5px 10px" bg={blueSecondary}>
              <Text color="white">{proposal?.proposer}</Text>
            </Center>
          </HStack>
        </ModalBody>

        <ModalFooter w="full" justifyContent="space-between">
          {!allVotes.includes(proposal?.id ?? "") ? (
            <>
              <Button bg={greenBG} onClick={() => handleVote(true)}>
                <Text color={greenFG}>Vote In Favour 👍🏻</Text>
              </Button>
              <Button bg={redBG} onClick={() => handleVote(true)}>
                <Text color={redFG}>Vote Against 👎🏻</Text>
              </Button>
            </>
          ) : (
            <Text>You have already voted on this proposal</Text>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VoteModal;
