const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("DemandCurve", function () {
  let DemandCurve;
  let demandCurveInstance;

  async function setupFixture() {
    DemandCurve = await ethers.getContractFactory("DemandCurve");
    demandCurveInstance = await DemandCurve.deploy(100, 50);
  }

  beforeEach(async () => {
    await setupFixture();
  });

  it("Should calculate price correctly", async function () {
    const tokenAmount = 100;
    const expectedPrice = 100 + tokenAmount * 50;
    const price = await demandCurveInstance.calculatePrice(tokenAmount);
    expect(price).to.equal(expectedPrice);
  });
});
