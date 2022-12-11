import { useToast } from "@chakra-ui/react";
import { Contract } from "ethers";

const useCreateStakeholder = (
  fundingDaoContract: Contract,
  loadBlockchainData: () => Promise<void>
) => {
  const toast = useToast();

  const createStakeholder = async (amount: string) => {
    if (amount === "" || amount === "0") {
      toast({
        title: "Please enter a valid amount",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      await fundingDaoContract.createStakeholder();
      await loadBlockchainData();
    }
  };

  return createStakeholder;
};

export default useCreateStakeholder;
