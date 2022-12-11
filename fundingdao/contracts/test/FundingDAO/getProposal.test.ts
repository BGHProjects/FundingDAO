import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";

describe("FundingDAO getProposal tests", () => {
  it("Should return correct proposal", async () => {
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
        "Proposal1",
        "description",
        Alice.address,
        1,
        "imageId",
        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    await expect(
      FundingDAOContract.connect(Alice).createProposal(
        "Proposal2",
        "description",
        Alice.address,
        1,
        "imageId",
        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    const proposal1 = await FundingDAOContract.getProposal(1);
    expect(proposal1.title).to.eq("Proposal2");
  });
});
