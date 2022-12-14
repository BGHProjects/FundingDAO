import { ethers } from "ethers";

const parseEther = (amount: string) => {
  return ethers.utils.formatEther(amount).toString();
};

export default parseEther;
