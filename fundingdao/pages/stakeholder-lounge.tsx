import {
  Center,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  chakra,
} from "@chakra-ui/react";
import Head from "next/head";
import { useContext, useState } from "react";
import { blueSecondary } from "../consts/colours";
import { DataContext } from "../contexts/dataContext";

export default function Home() {
  const { loading, account, createStakeholder, currentBal } =
    useContext(DataContext);
  const [val, setVal] = useState("");
  const toast = useToast();

  const handleContribute = async () => {
    if (!val) {
      toast({
        title: "Please enter a valid amount of MATIC to contribute.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await createStakeholder(val);
      toast({
        title: "Contribution Successful",
        description: `You successfully contributed ${val} MATIC`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setVal("");
    } catch (err) {
      console.log("Something went wrong contributing to the DAO ", err);
      toast({
        title: "Failed to contribute to DAO",
        description:
          "There was an issue contributing to the DAO. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center>
      <Head>
        <title>Funding DAO</title>
      </Head>
      {loading && <Text fontWeight="bold">Loading...</Text>}
      {!account && (
        <Text fontWeight="bold">Please connect Metamask Wallet</Text>
      )}
      {!loading && account && (
        <BalanceContainer border={`2px solid ${blueSecondary}`}>
          <Text fontWeight="bold" fontSize="2xl">
            Current Balance: {currentBal} MATIC
          </Text>
          <InputGroup mt="10px" w="full">
            <Input
              placeholder="Contribute more to the DAO"
              onChange={(e) => setVal(e.target.value)}
            />
            <InputRightElement w="70px">
              <Button bg={blueSecondary} onClick={() => handleContribute()}>
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </BalanceContainer>
      )}
    </Center>
  );
}

const BalanceContainer = chakra(Center, {
  baseStyle: {
    borderRadius: "10px",
    w: "400px",
    h: "200px",
    p: "20px",
    flexDirection: "column",
    jusitfyContent: "space-evenly",
  },
});
