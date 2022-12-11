import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "ethers";
import deployFixture from "./deployFixture";

describe("FundingDAO getMemberBal tests", () => {
  it("Should not allow an address that is not a member to call function", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(FundingDAOContract.connect(Alice).getMemberBal()).be.reverted;
  });

  it("Should correctly identify member's balance", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createStakeholder({
        value: ethers.utils.parseEther("0.1"),
      })
    ).not.be.reverted;

    expect(await FundingDAOContract.connect(Alice).getMemberBal()).to.equal(
      ethers.utils.parseEther("0.1")
    );
  });
});
