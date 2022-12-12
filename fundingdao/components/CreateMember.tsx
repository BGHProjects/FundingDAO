import { VStack, Input, Text, Button } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { blueSecondary, navyMain } from "../consts/colours";
import { DataContext } from "../contexts/dataContext";

const CreateMember = () => {
  const { createStakeholder } = useContext(DataContext);
  const [val, setVal] = useState("");

  return (
    <VStack
      w="600px"
      h="fit-content"
      justifyContent="center"
      borderRadius="10px"
      border={`2px solid ${blueSecondary}`}
      p="20px"
      spacing={5}
    >
      <Text alignSelf="center">You are not a member</Text>
      <Text textAlign="center">
        Send 0.1 MATIC to become a member. Send more than 0.1 MATIC to become a
        stakeholder
      </Text>
      <Input
        h="50px"
        w="100%"
        borderRadius="10px"
        placeholder="Amount in MATIC"
        onChange={(e) => setVal(e.target.value)}
      />
      <Button
        h="50px"
        w="100%"
        bg={blueSecondary}
        onClick={() => createStakeholder(val)}
        colorScheme="blue"
      >
        <Text color="white">Send</Text>
      </Button>
    </VStack>
  );
};

export default CreateMember;
