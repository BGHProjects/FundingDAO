import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

let Deployer: SignerWithAddress;
let Alice: SignerWithAddress;
let Bob: SignerWithAddress;
let Charlie: SignerWithAddress;

let FundingDAOContract;

const VALID_STAKEHOLDER_AMOUNT = ethers.utils.parseEther("0.2");
const VALID_PROPOSAL_AMOUNT = ethers.utils.parseEther("0.1");

const deployFixture = async () => {
  [Deployer, Alice, Bob, Charlie] = await ethers.getSigners();

  // Instance of the FundingDAO contract
  const FundingDAO_Contract = await ethers.getContractFactory(
    "FundingDAO",
    Deployer
  );
  FundingDAOContract = await FundingDAO_Contract.deploy();
  await FundingDAOContract.deployed();

  return {
    Deployer,
    Alice,
    Bob,
    Charlie,
    FundingDAOContract,
    VALID_PROPOSAL_AMOUNT,
    VALID_STAKEHOLDER_AMOUNT,
  };
};

export default deployFixture;
