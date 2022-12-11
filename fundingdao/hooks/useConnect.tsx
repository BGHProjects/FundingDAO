import { useToast } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

/**
 * @param setAccount Setter to set the user's account
 * @param loadBlockchainData Function to query blockchain data
 * @returns Helper function to connect a user's wallet
 */
const useConnect = (
  setAccount: Dispatch<SetStateAction<string>>,
  loadBlockchainData: () => Promise<void>
) => {
  const toast = useToast();

  const connect = async () => {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        toast({
          title: "Non-Eth browser detected",
          description: "Please consider using MetaMask",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // Just connect the first account
      setAccount(accounts[0]);
      await loadBlockchainData();
    } catch (err) {
      console.log("Error connecting wallet: ", err);
      window.alert("Error connecting wallet, please try again later");
      toast({
        title: "Error connecting wallet",
        description: "Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return connect;
};

export default useConnect;
