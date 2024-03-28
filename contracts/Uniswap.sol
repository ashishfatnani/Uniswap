// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";

contract Uniswap {
    mapping(address => mapping(address => uint256)) public reserves;

    event Swap(
        address indexed fromToken,
        address indexed toToken,
        address indexed sender,
        uint256 amountIn,
        uint256 amountOut
    );

    function swapTokens(
        address _fromToken,
        address _toToken,
        uint256 _amountIn,
        uint256 _amountOutMin
    ) external {
        require(
            reserves[_fromToken][_toToken] > 0 &&
                reserves[_toToken][_fromToken] > 0,
            "Token pair not supported"
        );
        uint256 amountOut = calculateSwapAmount(
            _fromToken,
            _toToken,
            _amountIn
        );
        require(amountOut >= _amountOutMin, "Slippage exceeded");
        ERC20Token fromToken = ERC20Token(_fromToken);
        ERC20Token toToken = ERC20Token(_toToken);
        fromToken.transferFrom(msg.sender, address(this), _amountIn);
        toToken.transfer(msg.sender, amountOut);
        emit Swap(_fromToken, _toToken, msg.sender, _amountIn, amountOut);
    }

    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) external {
        require(
            reserves[_tokenA][_tokenB] == 0 && reserves[_tokenB][_tokenA] == 0,
            "Liquidity already added"
        );
        ERC20Token tokenA = ERC20Token(_tokenA);
        ERC20Token tokenB = ERC20Token(_tokenB);
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transferFrom(msg.sender, address(this), _amountB);
        reserves[_tokenA][_tokenB] = _amountA;
        reserves[_tokenB][_tokenA] = _amountB;
    }

    function calculateSwapAmount(
        address _fromToken,
        address _toToken,
        uint256 _amountIn
    ) internal view returns (uint256) {
        uint256 amountInWithFee = _amountIn * 997; // platform fees of 0.3% is set
        uint256 numerator = amountInWithFee * reserves[_fromToken][_toToken];
        uint256 denominator = (reserves[_fromToken][_toToken] * 1000) +
            amountInWithFee;
        return numerator / denominator;
    }
}
