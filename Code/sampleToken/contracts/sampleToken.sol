// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT

//https://docs.openzeppelin.com/contracts/4.x/erc20

pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract SampleToken is ERC20 {

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}