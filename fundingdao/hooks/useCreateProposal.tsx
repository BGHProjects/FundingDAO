import { useToast } from "@chakra-ui/react";
import { Contract } from "ethers";
import parseEther from "../helpers/parseEther";
import { IProposal } from "../contexts/dataContext";

const useCreateProposal = (
  fundingDaoContract: Contract,
  loadBlockchainData: () => Promise<void>
) => {
  const toast = useToast();

  const createProposal = async ({
    title,
    description,
    amount,
    recipient,
    imageId,
  }: Omit<IProposal, "id">) => {
    if (amount === "" || amount === "0") {
      toast({
        title: "Please enter a valid amount",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      await fundingDaoContract.createProposal(
        title,
        description,
        recipient,
        parseEther(amount),
        imageId,
        { value: parseEther(amount) }
      );
      await loadBlockchainData();
    }
  };

  return createProposal;
};

export default useCreateProposal;
