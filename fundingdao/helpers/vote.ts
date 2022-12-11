import { Contract } from "ethers";

const vote = async (
  id: string,
  vote: boolean,
  fundingDaoContract: Contract,
  loadBlockchainData: () => Promise<void>
) => {
  await fundingDaoContract.vote(id, vote);
  await loadBlockchainData();
};

export default vote;
