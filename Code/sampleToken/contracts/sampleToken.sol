// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT

//https://docs.openzeppelin.com/contracts/4.x/erc20

pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract SampleToken is ERC20 {

    constructor(uint256 initialSupply) ERC20("Gold", "GLD") {
        require(initialSupply > 0, "INITIAL_SUPPLY has to be greater than 0");
        _mint(msg.sender, initialSupply);
    }
}