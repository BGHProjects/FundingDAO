import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import deployFixture from "./deployFixture";

describe("FundingDAO getStakeholderBal tests", () => {
  it("Should not allow an address that is not a stakeholder to call function", async () => {
    const { FundingDAOContract, Alice } = await loadFixture(deployFixture);

    await expect(FundingDAOContract.connect(Alice).getStakeholderBal()).be
      .reverted;
  });

  it("Should correctly identify stakeholder's balance", async () => {
    const { FundingDAOContract, Alice, VALID_STAKEHOLDER_AMOUNT } =
      await loadFixture(deployFixture);

    await expect(
      FundingDAOContract.connect(Alice).createStakeholder({
        value: VALID_STAKEHOLDER_AMOUNT,
      })
    ).not.be.reverted;

    expect(
      await FundingDAOContract.connect(Alice).getStakeholderBal()
    ).to.equal(VALID_STAKEHOLDER_AMOUNT);
  });
});
