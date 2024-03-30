const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Uniswap", function () {
  let ERC20Token;
  let Uniswap;
  let tokenAInstance;
  let tokenBInstance;
  let uniswapInstance;

  beforeEach(async () => {
    const fixtures = await loadFixture(async () => {
      ERC20Token = await ethers.getContractFactory("ERC20Token");
      Uniswap = await ethers.getContractFactory("Uniswap");

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

      uniswapInstance = await Uniswap.deploy();
      await uniswapInstance.deployed();

      // Add liquidity
      await tokenAInstance.transfer(
        uniswapInstance.address,
        ethers.utils.parseEther("10000")
      );
      await tokenBInstance.transfer(
        uniswapInstance.address,
        ethers.utils.parseEther("10000")
      );
      await uniswapInstance.addLiquidity(
        tokenAInstance.address,
        tokenBInstance.address,
        ethers.utils.parseEther("10000"),
        ethers.utils.parseEther("10000")
      );
    });
  });

  it("Should swap tokens correctly", async function () {
    const [sender, recipient] = await ethers.getSigners();
    const amountIn = ethers.utils.parseEther("1000");
    const amountOutMin = 0;
    await uniswapInstance
      .connect(sender)
      .swapTokens(
        tokenAInstance.address,
        tokenBInstance.address,
        amountIn,
        amountOutMin
      );
    expect(await tokenAInstance.balanceOf(recipient.address)).to.equal(
      amountIn
    );
  });

  it("Should add liquidity correctly", async function () {
    expect(await tokenAInstance.balanceOf(uniswapInstance.address)).to.equal(
      ethers.utils.parseEther("20000")
    );
    expect(await tokenBInstance.balanceOf(uniswapInstance.address)).to.equal(
      ethers.utils.parseEther("20000")
    );
  });
});
