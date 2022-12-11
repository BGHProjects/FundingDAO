import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import deployFixture from "./deployFixture";

describe("FundingDAO releaseFunding tests", () => {
  it("Should not allow a user is not part a stakeholder to call the function ", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(FundingDAOContract.connect(Alice).releaseFunding(0)).be
      .reverted;
  });

  it("Should revert if the proposal has not reached its funding goal", async () => {
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
        2,
        "imageId",
        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    await expect(FundingDAOContract.connect(Alice).vote(0, true)).not.be
      .reverted;

    await expect(
      FundingDAOContract.connect(Alice).provideFunds(0, 1, {
        value: ethers.utils.parseEther("1"),
      })
    ).not.be.reverted;

    await expect(
      FundingDAOContract.connect(Alice).releaseFunding(0)
    ).be.revertedWithCustomError(FundingDAOContract, "InadequateFunds");
  });

  it("Should allow releasing of funds", async () => {
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
        2,
        "imageId",
        { value: VALID_PROPOSAL_AMOUNT }
      )
    ).not.be.reverted;

    await expect(FundingDAOContract.connect(Alice).vote(0, true)).not.be
      .reverted;

    await expect(
      FundingDAOContract.connect(Alice).provideFunds(0, 2, {
        value: ethers.utils.parseEther("2"),
      })
    ).not.be.reverted;

    await expect(FundingDAOContract.connect(Alice).releaseFunding(0)).not.be
      .reverted;
  });
});
