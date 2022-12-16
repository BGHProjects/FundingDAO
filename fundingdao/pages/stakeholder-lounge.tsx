import {
  Button,
  Center,
  chakra,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useContext, useState } from "react";
import { gradBG } from "../consts/colours";
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
    <Center flexDirection="column">
      <Head>
        <title>Funding DAO</title>
      </Head>
      {loading && (
        <Text fontWeight="bold" color="white">
          Loading...
        </Text>
      )}
      {!account && (
        <Text fontWeight="bold" color="white">
          Please connect Metamask Wallet
        </Text>
      )}
      {!loading && account && (
        <BalanceContainer bgGradient={gradBG}>
          <Text fontWeight="bold" fontSize="2xl" color="white">
            Current Balance:
          </Text>
          <Text fontWeight="bold" fontSize="2xl" color="white">
            {currentBal} MATIC
          </Text>
          <InputGroup mt="40px" w="full">
            <Input
              placeholder="Contribute more to the DAO"
              onChange={(e) => setVal(e.target.value)}
              color="white"
            />
            <InputRightElement w="70px">
              <Button bg="orange" onClick={() => handleContribute()}>
                <Text color="white">Send</Text>
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
  },
});
