import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "ethers";
import deployFixture from "./deployFixture";

describe("FundingDAO isMember tests", () => {
  it("Should identify account not in DAO as not a Member", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    expect(await FundingDAOContract.connect(Alice).isMember()).to.equal(false);
  });

  it("Should identify user as a Member", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createStakeholder({
        value: ethers.utils.parseEther("0.1"),
      })
    ).not.be.reverted;

    expect(await FundingDAOContract.connect(Alice).isMember()).to.equal(true);
  });
});
