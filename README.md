# Custom Uniswap

## Overview

This project is a custom implementation of Uniswap, a decentralized exchange protocol, with some modifications to experiment with a new demand curve. The goal is to explore how changes to the bonding curve affect liquidity provisioning and pricing mechanisms within the decentralized exchange ecosystem.
This is the end goal of this project but will release the builds in phases, as I am considering this project for my course project submission.

## Features

- Custom bonding curve implementation
- Automated market-making mechanism
- Liquidity pooling and token swapping functionalities

## Technologies Used

- Hardhat: Development environment for Ethereum smart contracts
- Solidity: Smart contract programming language
- Ethereum: Blockchain platform for decentralized applications
- Web3.js: JavaScript library for interacting with Ethereum blockchain

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/ashishfatnani/Uniswap.git
   ```

2. **Install dependencies:**

   ```
   cd uniswap
   npm install
   ```

## Usage

1. **Compile smart contracts:**

   ```
   npx hardhat compile
   ```

2. **Deploy contracts to a local or testnet blockchain:**

   ```
   npx hardhat run scripts/deploy.js --network networkName
   ```

3. **Interact with deployed contracts through the user interface or command-line interface.**

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any enhancements, bug fixes, or new features.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Uniswap: Inspiration for the decentralized exchange model
- OpenZeppelin: Smart contract security best practices and guidelines

## Contact

For inquiries or support, please contact [ashishfatnani3@gmail.com](mailto:ashishfatnani3@gmail.com).

## Note

- As of now the custom ratio isn't considerd for the time constarints.
- Will add frontend in the next sprint.
- Will add Liquidity tokens, which will be provided to the user once they add their funds in the liquidity.
