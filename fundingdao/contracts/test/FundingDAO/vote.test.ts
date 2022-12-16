import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("FundingDAO vote tests", () => {
  it("Should not allow a user who is not a stakeholder to vote on a proposal", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(FundingDAOContract.connect(Alice).vote(0, false)).be.reverted;
  });

  it("Should not allow a vote on a proposal that is already completed", async () => {
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

    const fourDays = 3600 * 24 * 4;

    await time.increase(fourDays);

    await expect(
      FundingDAOContract.connect(Alice).vote(0, false)
    ).be.revertedWithCustomError(FundingDAOContract, "TimePeriodElapsed");
  });

  it("Should allow a vote for a proposal", async () => {
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
  });

  it("Should allow a vote against a proposal", async () => {
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

    await expect(FundingDAOContract.connect(Alice).vote(0, false)).not.be
      .reverted;
  });

  it("Should not allow multiple votes", async () => {
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

    await expect(FundingDAOContract.connect(Alice).vote(0, false)).not.be
      .reverted;
    await expect(
      FundingDAOContract.connect(Alice).vote(0, false)
    ).be.revertedWithCustomError(FundingDAOContract, "OnlySingleVoteAllowed");
  });
});
