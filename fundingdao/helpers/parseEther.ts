import { ethers } from "ethers";

const parseEther = (amount: string) => {
  return ethers.utils.parseEther(amount).toString();
};

export default parseEther;
