// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DemandCurve {
    uint256 public basePrice;
    uint256 public slopeCoefficient;

    constructor(uint256 _basePrice, uint256 _slopeCoefficient) {
        basePrice = _basePrice;
        slopeCoefficient = _slopeCoefficient;
    }

    // Calculate the price based on the demand curve
    function calculatePrice(
        uint256 _tokenAmount
    ) public view returns (uint256) {
        return basePrice + (_tokenAmount * slopeCoefficient);
    }
}
