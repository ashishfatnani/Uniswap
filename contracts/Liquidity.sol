// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";

contract LiquidityPool {
    ERC20Token public tokenA;
    ERC20Token public tokenB;

    mapping(address => uint256) public liquidity;

    event LiquidityAdded(
        address indexed provider,
        uint256 amountA,
        uint256 amountB
    );
    event LiquidityRemoved(
        address indexed provider,
        uint256 amountA,
        uint256 amountB
    );

    constructor(address _tokenAAddress, address _tokenBAddress) {
        tokenA = ERC20Token(_tokenAAddress);
        tokenB = ERC20Token(_tokenBAddress);
    }

    function provideLiquidity(uint256 _amountA, uint256 _amountB) external {
        require(_amountA > 0 && _amountB > 0, "Invalid amounts");
        require(
            tokenA.transferFrom(msg.sender, address(this), _amountA),
            "Token A transfer failed"
        );
        require(
            tokenB.transferFrom(msg.sender, address(this), _amountB),
            "Token B transfer failed"
        );
        liquidity[msg.sender] += _amountA + _amountB;
        emit LiquidityAdded(msg.sender, _amountA, _amountB);
    }

    function removeLiquidity(uint256 _amountA, uint256 _amountB) external {
        require(_amountA > 0 && _amountB > 0, "Invalid amounts");

        uint256 userBalanceA = tokenA.balanceOf(msg.sender);
        uint256 userBalanceB = tokenB.balanceOf(msg.sender);

        require(
            userBalanceA >= _amountA && userBalanceB >= _amountB,
            "Insufficient balance"
        );

        tokenA.transfer(msg.sender, _amountA);
        tokenB.transfer(msg.sender, _amountB);

        emit LiquidityRemoved(msg.sender, _amountA, _amountB);
    }
}
