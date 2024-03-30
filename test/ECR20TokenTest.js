const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("ERC20Token", function () {
  let ERC20Token;
  let erc20TokenInstance;

  async function setupFixture() {
    ERC20Token = await ethers.getContractFactory("ERC20Token");
    erc20TokenInstance = await ERC20Token.deploy(
      "MyToken",
      "MTK",
      18,
      ethers.parseUnits("1000", 18)
    );
    // await erc20TokenInstance.deployed();
  }

  beforeEach(async () => {
    await setupFixture();
  });

  it("Should deploy ERC20Token with the correct parameters", async function () {
    const name = await erc20TokenInstance.name();
    const symbol = await erc20TokenInstance.symbol();
    const decimals = await erc20TokenInstance.decimals();
    const totalSupply = await erc20TokenInstance.totalSupply();
    expect(name).to.equal("MyToken");
    expect(symbol).to.equal("MTK");
    expect(decimals).to.equal(18); // Assert decimals
    expect(totalSupply).to.equal(ethers.parseUnits("1000", 18));
  });
});
