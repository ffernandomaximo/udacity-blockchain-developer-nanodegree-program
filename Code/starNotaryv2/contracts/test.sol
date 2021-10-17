// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT

//https://docs.openzeppelin.com/contracts/4.x/erc20

pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


contract SampleToken is ERC721 {

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC721(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}