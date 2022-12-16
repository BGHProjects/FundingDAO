import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";

describe("FundingDAO getVotes tests", () => {
  it("Should identify correct number of votes", async () => {
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
      FundingDAOContract.connect(Alice).createProposal(
        "title1",
        "description",
        Alice.address,
        1,

        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    await expect(
      FundingDAOContract.connect(Alice).createProposal(
        "title2",
        "description",
        Alice.address,
        1,

        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    await expect(FundingDAOContract.connect(Alice).vote(0, false)).not.be
      .reverted;
    await expect(FundingDAOContract.connect(Alice).vote(1, false)).not.be
      .reverted;
    await expect(FundingDAOContract.connect(Alice).vote(2, false)).not.be
      .reverted;

    const noOfVotes = await FundingDAOContract.connect(Alice).getVotes();

    expect(noOfVotes.length).to.eq(3);
  });
});
