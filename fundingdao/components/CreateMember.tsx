import { Button, chakra, Input, Text, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { buttonPurple, gradBG } from "../consts/colours";
import { DataContext } from "../contexts/dataContext";

const CreateMember = () => {
  const { createStakeholder } = useContext(DataContext);
  const [val, setVal] = useState("");

  return (
    <Container bgGradient={gradBG} spacing={5}>
      <Text alignSelf="center" color="white" fontWeight="bold" fontSize="20px">
        You are not a member
      </Text>
      <Text textAlign="center" color="white" px="20px">
        Send 0.1 MATIC to become a member. Send more than 0.1 MATIC to become a
        stakeholder
      </Text>
      <StyledInput
        placeholder="Amount in MATIC"
        onChange={(e) => setVal(e.target.value)}
      />
      <Button
        h="50px"
        w="100%"
        bg={buttonPurple}
        onClick={() => createStakeholder(val)}
      >
        <Text color="white">Send</Text>
      </Button>
    </Container>
  );
};

const Container = chakra(VStack, {
  baseStyle: {
    w: "600px",
    h: "fit-content",
    justifyContent: "center",
    borderRadius: "10px",
    p: "20px",
    textColor: "white",
  },
});

const StyledInput = chakra(Input, {
  baseStyle: {
    h: "50px",
    w: "100%",
    borderRadius: "10px",
    bg: "transparent",
  },
});

export default CreateMember;
