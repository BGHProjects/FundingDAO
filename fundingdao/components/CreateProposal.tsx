import {
  Flex,
  useToast,
  Text,
  chakra,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { blueSecondary } from "../consts/colours";
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
        imageId: "1",
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
    <Container>
      <Text fontWeight="bold" fontSize="24px">
        Create Proposal
      </Text>
      <Text alignSelf="flex-start" mt="10px">
        You will need to lock 0.2 MATIC to create a proposal.
      </Text>
      <Text alignSelf="flex-start">
        {" "}
        If the proposal is accepted, your will be refunded the 0.2 MATIC, but if
        the proposal is rejected, the 0.2 MATIC will go to the DAO treasury.
      </Text>
      <Input
        mt={SPACING}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        mt={SPACING}
        placeholder="Describe your project here"
        onChange={(e) => setDescription(e.target.value)}
        h="200px"
      />
      <Input
        mt={SPACING}
        placeholder="Funding Receiver's Address"
        onChange={(e) => setRecipient(e.target.value)}
      />
      <Input
        mt={SPACING}
        placeholder="Funding Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        mt={SPACING}
        onClick={() => handleCreateProposal()}
        bg={blueSecondary}
        colorScheme="blue"
      >
        <Text color="white">Create Proposal</Text>
      </Button>
    </Container>
  );
};

const Container = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    h: "fit-content",
    w: "1000px",
    alignItems: "center",
    p: "10px",
    border: `2px solid ${blueSecondary}`,
    borderRadius: "10px",
  },
});

export default CreateProposal;
