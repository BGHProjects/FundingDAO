import { ethers } from "ethers";

const parseEther = (amount: string) => {
  return ethers.utils.parseEther(amount);
};

export default parseEther;
