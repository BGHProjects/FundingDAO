import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "ethers";
import deployFixture from "./deployFixture";

describe("FundingDAO provideFunds tests", () => {
  it("Should not allow a user who is not a part of the DAO to call function", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(FundingDAOContract.connect(Alice).provideFunds(0, 10)).be
      .reverted;
  });

  it("Should not allow a Member to call function", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createStakeholder({
        value: ethers.utils.parseEther("0.1"),
      })
    ).not.be.reverted;

    await expect(FundingDAOContract.connect(Alice).provideFunds(0, 10)).be
      .reverted;
  });

  it("Should not allow funding if the proposal did not pass", async () => {
    const {
      FundingDAOContract,
      Alice,
      VALID_PROPOSAL_AMOUNT,
      VALID_STAKEHOLDER_AMOUNT,
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

        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    await expect(
      FundingDAOContract.connect(Alice).provideFunds(0, 1)
    ).be.revertedWithCustomError(FundingDAOContract, "ProposalDidNotPass");
  });

  it("Should allow funding of the proposal", async () => {
    const {
      FundingDAOContract,
      Alice,
      VALID_PROPOSAL_AMOUNT,
      VALID_STAKEHOLDER_AMOUNT,
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

        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    await expect(FundingDAOContract.connect(Alice).vote(0, true)).not.be
      .reverted;

    await expect(FundingDAOContract.connect(Alice).provideFunds(0, 1)).not.be
      .reverted;
  });

  it("Should not allow funding if the proposal is already funded", async () => {
    const {
      FundingDAOContract,
      Alice,
      VALID_PROPOSAL_AMOUNT,
      VALID_STAKEHOLDER_AMOUNT,
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

        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    await expect(FundingDAOContract.connect(Alice).vote(0, true)).not.be
      .reverted;

    await expect(FundingDAOContract.connect(Alice).provideFunds(0, 1)).not.be
      .reverted;

    await expect(
      FundingDAOContract.connect(Alice).provideFunds(0, 1)
    ).be.revertedWithCustomError(FundingDAOContract, "ProposalAlreadyFunded");
  });
});
