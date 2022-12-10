import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "ethers";
import deployFixture from "./deployFixture";

describe("FundingDAO createProposal tests", () => {
  it("Should not allow an address that is not a member to make a proposal", async () => {
    const { FundingDAOContract, Alice, VALID_PROPOSAL_AMOUNT } =
      await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createProposal(
        "title",
        "description",
        Alice.address,
        1,
        "imageId",
        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).be.reverted;
  });

  it("Should not allow a proposal that with an inadequate proposel deposit", async () => {
    const { FundingDAOContract, Alice, VALID_STAKEHOLDER_AMOUNT } =
      await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createStakeholder({
        value: VALID_STAKEHOLDER_AMOUNT,
      })
    ).not.be.reverted;

    await expect(
      FundingDAOContract.connect(Alice).createProposal(
        "title",
        "description",
        Alice.address,
        1,
        "imageId",
        { value: ethers.utils.parseEther("0.01") }
      )
    ).be.revertedWithCustomError(
      FundingDAOContract,
      "InadequateProposalDeposit"
    );
  });

  it("Should allow the creation of a proposal", async () => {
    const {
      FundingDAOContract,
      Alice,
      VALID_STAKEHOLDER_AMOUNT,
      VALID_PROPOSAL_AMOUNT,
    } = await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createStakeholder({
        value: VALID_STAKEHOLDER_AMOUNT,
      })
    ).not.be.reverted;

    await expect(
      FundingDAOContract.connect(Alice).createProposal(
        "title",
        "description",
        Alice.address,
        1,
        "imageId",
        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;
  });
});
