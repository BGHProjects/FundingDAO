import { Contract } from "ethers";
import parseEther from "./parseEther";

const provideFundsHelper = async (
  id: string,
  amount: string,
  fundingDaoContract: Contract,
  loadBlockchainData: () => Promise<void>
) => {
  await fundingDaoContract.provideFunds(id, parseEther(amount), {
    value: parseEther(amount),
  });
  await loadBlockchainData();
};

export default provideFundsHelper;
