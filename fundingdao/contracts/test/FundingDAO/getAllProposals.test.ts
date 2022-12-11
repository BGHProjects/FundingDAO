import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";

describe("FundingDAO getAllProposals tests", () => {
  it("Should identify no proposals", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    const allProposals = await FundingDAOContract.connect(
      Alice
    ).getAllProposals();

    expect(allProposals.length).to.equal(0);
  });

  it("Should identify one proposal", async () => {
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
        "imageId",
        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    const allProposals = await FundingDAOContract.connect(
      Alice
    ).getAllProposals();

    expect(allProposals.length).to.equal(1);
  });

  it("Should identify multiple proposals", async () => {
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
        "imageId",
        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    await expect(
      FundingDAOContract.connect(Alice).createProposal(
        "title1",
        "description",
        Alice.address,
        1,
        "imageId",
        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    const allProposals = await FundingDAOContract.connect(
      Alice
    ).getAllProposals();

    expect(allProposals.length).to.equal(2);
  });
});
