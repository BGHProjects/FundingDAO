import {
  Button,
  chakra,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { buttonPurple, gradBG } from "../consts/colours";
import { DataContext } from "../contexts/dataContext";

const CreateProposal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const { createProposal } = useContext(DataContext);

  const toast = useToast();

  const handleCreateProposal = async () => {
    if (!title || !description || !recipient || !amount) {
      toast({
        title: "Incomplete Form",
        description:
          "Please fill out the entirety of the form to create a proposal",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await createProposal({
        title,
        description,
        amount,
        recipient,
      });

      setTitle("");
      setDescription("");
      setRecipient("");
      setAmount("");
    } catch (err) {
      console.log("Something went wrong creating proposal ", err);
      toast({
        title: "Error Creating Proposal",
        description:
          "There was an error creating this proposal. Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const SPACING = "15px";

  return (
    <Container bgGradient={gradBG} spacing={10}>
      <Text fontWeight="bold" fontSize="24px" color="white">
        Create Proposal
      </Text>

      <VStack>
        <Text alignSelf="flex-start" mt="10px" color="white">
          You will need to lock 0.2 MATIC to create a proposal.
        </Text>
        <Text alignSelf="flex-start" color="white">
          {" "}
          If the proposal is accepted, your will be refunded the 0.2 MATIC, but
          if the proposal is rejected, the 0.2 MATIC will go to the DAO
          treasury.
        </Text>
      </VStack>

      <Input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        bg="transparent"
      />
      <Textarea
        placeholder="Describe your project here"
        onChange={(e) => setDescription(e.target.value)}
        h="200px"
        bg="transparent"
      />
      <Input
        mt={SPACING}
        placeholder="Funding Receiver's Address"
        onChange={(e) => setRecipient(e.target.value)}
        bg="transparent"
      />
      <Input
        placeholder="Funding Amount"
        onChange={(e) => setAmount(e.target.value)}
        bg="transparent"
      />
      <Button
        onClick={() => handleCreateProposal()}
        bg={buttonPurple}
        colorScheme="blue"
      >
        <Text color="white">Create Proposal</Text>
      </Button>
    </Container>
  );
};

const Container = chakra(VStack, {
  baseStyle: {
    h: "fit-content",
    w: "1000px",
    alignItems: "center",
    p: "20px",
    borderRadius: "10px",
  },
});

export default CreateProposal;
