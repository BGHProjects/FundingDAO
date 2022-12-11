import { Contract } from "ethers";

const getProposalHelper = async (id: string, fundingDaoContract: Contract) => {
  const response = await fundingDaoContract.getProposal(id);
  return response;
};

export default getProposalHelper;
