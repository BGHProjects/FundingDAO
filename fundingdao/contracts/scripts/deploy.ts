import { ethers } from "hardhat";

async function main() {
  const FundingDAOContract = await ethers.getContractFactory("FundingDAO");
  const FundingDAO = await FundingDAOContract.deploy();

  await FundingDAO.deployed();

  console.log("FundingDAO address: ", FundingDAO.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
