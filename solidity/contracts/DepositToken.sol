pragma solidity ^0.8.0;

contract DepositToken {
    // owner of contract
    address public contractOwner;

    // constructor is called during contract deployment
    constructor() {
        contractOwner = msg.sender;
    }

    // func to send money to the contract
    function transfer() public payable {}

    // func to get balance of contract
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    // func to withdraw funds from contract to owner
    function withdrawal(address payable _to) public {
        require(contractOwner == _to);
        _to.transfer(address(this).balance);
    }
}