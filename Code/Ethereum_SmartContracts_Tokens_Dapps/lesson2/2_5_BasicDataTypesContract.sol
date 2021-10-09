pragma solidity ^0.4.25;

contract BasicDataTypesContract {
    uint8 a = 255;
    address public owner;
    bool public flag = true;
    uint ownerInitialBalance;

    function test (address addr) public returns (uint) {
        owner = addr;
        ownerInitialBalance = owner.balance;
        if (1 > 0) {
            //do something
        }
        return ownerInitialBalance;
    }
}