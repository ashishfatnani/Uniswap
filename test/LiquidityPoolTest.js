const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("LiquidityPool", function () {
  let ERC20Token;
  let LiquidityPool;
  let tokenAInstance;
  let tokenBInstance;
  let liquidityPoolInstance;

  beforeEach(async () => {
    const fixtures = await loadFixture(async () => {
      ERC20Token = await ethers.getContractFactory("ERC20Token");
      LiquidityPool = await ethers.getContractFactory("LiquidityPool");

      tokenAInstance = await ERC20Token.deploy(
        "Token A",
        "TKNA",
        18,
        ethers.utils.parseEther("1000000")
      );
      await tokenAInstance.deployed();

      tokenBInstance = await ERC20Token.deploy(
        "Token B",
        "TKNB",
        18,
        ethers.utils.parseEther("1000000")
      );
      await tokenBInstance.deployed();

      liquidityPoolInstance = await LiquidityPool.deploy(
        tokenAInstance.address,
        tokenBInstance.address
      );
      await liquidityPoolInstance.deployed();
    });
  });

  it("Should provide liquidity correctly", async function () {
    const [provider] = await ethers.getSigners();
    const amountA = ethers.utils.parseEther("1000");
    const amountB = ethers.utils.parseEther("1000");

    await tokenAInstance
      .connect(provider)
      .approve(liquidityPoolInstance.address, amountA);
    await tokenBInstance
      .connect(provider)
      .approve(liquidityPoolInstance.address, amountB);
    await liquidityPoolInstance
      .connect(provider)
      .provideLiquidity(amountA, amountB);

    expect(
      await tokenAInstance.balanceOf(liquidityPoolInstance.address)
    ).to.equal(amountA);
    expect(
      await tokenBInstance.balanceOf(liquidityPoolInstance.address)
    ).to.equal(amountB);
  });

  it("Should remove liquidity correctly", async function () {
    const [provider] = await ethers.getSigners();
    const amountA = ethers.utils.parseEther("1000");
    const amountB = ethers.utils.parseEther("1000");

    await tokenAInstance
      .connect(provider)
      .approve(liquidityPoolInstance.address, amountA);
    await tokenBInstance
      .connect(provider)
      .approve(liquidityPoolInstance.address, amountB);
    await liquidityPoolInstance
      .connect(provider)
      .provideLiquidity(amountA, amountB);

    await liquidityPoolInstance
      .connect(provider)
      .removeLiquidity(amountA, amountB);

    expect(await tokenAInstance.balanceOf(provider.address)).to.equal(amountA);
    expect(await tokenBInstance.balanceOf(provider.address)).to.equal(amountB);
  });
});
