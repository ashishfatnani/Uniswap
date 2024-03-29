// scripts/deploy.js
require("@nomicfoundation/hardhat-toolbox");

const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const ERC20Token = await ethers.getContractFactory("ERC20Token");
  const LiquidityPool = await ethers.getContractFactory("LiquidityPool");
  const Uniswap = await ethers.getContractFactory("Uniswap");

  // Deploy ERC20 tokens
  const tokenA = await ERC20Token.deploy(
    "TokenA",
    "TKA",
    18,
    ethers.parseEther("1000000")
  );
  const tokenB = await ERC20Token.deploy(
    "TokenB",
    "TKB",
    18,
    ethers.parseEther("1000000")
  );

  console.log("TokenA address:", tokenA.target);
  console.log("TokenB address:", tokenB.target);

  // Deploy Liquidity Pool with addresses of ERC20 tokens
  const liquidityPool = await LiquidityPool.deploy(
    tokenA.target,
    tokenB.target
  );
  console.log("Liquidity Pool address:", liquidityPool.target);

  // Deploy Uniswap with addresses of ERC20 tokens
  const uniswap = await Uniswap.deploy();
  console.log("Uniswap address:", uniswap.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
