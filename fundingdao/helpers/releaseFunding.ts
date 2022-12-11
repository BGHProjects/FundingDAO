import { Contract } from "ethers";

const releaseFundingHelper = async (
  id: string,
  fundingDaoContract: Contract,
  loadBlockchainData: () => Promise<void>
) => {
  await fundingDaoContract.releaseFunding(id);
  await loadBlockchainData();
};

export default releaseFundingHelper;
