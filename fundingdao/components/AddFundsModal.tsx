import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { blueSecondary, gradBG } from "../consts/colours";
import { DataContext } from "../contexts/dataContext";

interface IAddFundsModal {
  isOpen: boolean;
  closeModal: () => void;
  id: string;
  fundingRequired: string;
  fundingRaised: string;
}

const AddFundsModal = ({
  isOpen,
  closeModal,
  id,
  fundingRequired,
  fundingRaised,
}: IAddFundsModal) => {
  const { provideFunds } = useContext(DataContext);
  const [amount, setAmount] = useState("");
  const toast = useToast();

  const handleProvideFunds = async () => {
    if (!amount) {
      toast({
        title: "Please enter a valid amount to provide funds",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await provideFunds(id, amount);
      toast({
        title: "Successfully provided funds",
        description: `You successfully provided ${amount} MATIC to this proposal`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setAmount("");
    } catch (err) {
      console.log("Something went wrong providing funds ", err);
      toast({
        title: "Failed to provide funds",
        description:
          "Something went wrong provding funds for this proposal. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="lg">
      <ModalOverlay />
      <ModalContent bgGradient={gradBG}>
        <ModalHeader>
          <Text color="white">Add Funds</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="white">
            How much would you like to invest in this project?
          </Text>
          <Text mt="10px" color="white">
            Required Funding -{" "}
            {parseInt(fundingRequired) < 0 ? "-" : fundingRequired} MATIC
          </Text>
          <Text color="white">Funding Raised - {fundingRaised} MATIC</Text>
          <Input
            type="number"
            w="full"
            borderRadius="10px"
            onChange={(e) => setAmount(e.target.value)}
            mt="20px"
            placeholder="Amount in MATIC"
            color="white"
          />
        </ModalBody>
        <ModalFooter>
          <Button bg={blueSecondary} onClick={() => handleProvideFunds()}>
            <Text color="white">Pay</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddFundsModal;
