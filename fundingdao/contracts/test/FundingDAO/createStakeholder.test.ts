import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "ethers";
import deployFixture from "./deployFixture";

describe("FundingDAO createStakeholder tests", () => {
  it("Should create a new member", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createStakeholder({
        value: ethers.utils.parseEther("0.1"),
      })
    ).not.be.reverted;

    expect(await FundingDAOContract.connect(Alice).isMember()).to.equal(true);
  });

  it("Should not create a new stakeholder", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createStakeholder({
        value: ethers.utils.parseEther("0.1"),
      })
    ).not.be.reverted;

    expect(await FundingDAOContract.connect(Alice).isStakeholder()).to.equal(
      false
    );
  });

  it("Should create a new stakeholder", async () => {
    const { FundingDAOContract, Alice, VALID_STAKEHOLDER_AMOUNT } =
      await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createStakeholder({
        value: VALID_STAKEHOLDER_AMOUNT,
      })
    ).not.be.reverted;

    expect(await FundingDAOContract.connect(Alice).isStakeholder()).to.equal(
      true
    );
  });
});
