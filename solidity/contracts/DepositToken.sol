pragma solidity ^0.8.0;

contract DepositToken {
    // owner of contract
    address public contractOwner;

    // mapping of deposits by depositor address
    mapping(address => uint) public deposits;

    // constructor is called during contract deployment
    constructor() {
        contractOwner = msg.sender;
    }

    // event to log transfers
    event Transfer(address indexed sender, uint amount);

    // modifier to check if caller is contract owner
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the contract owner can call this function.");
        _;
    }

    // func to send money to the contract and log the transfer
    function transfer() public payable {
        deposits[msg.sender] += msg.value;
        emit Transfer(msg.sender, msg.value);
    }

    // func to get balance of contract
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    // func to withdraw funds from contract to owner
    function withdrawal() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    // func to allow depositors to withdraw their funds
    function withdrawDeposit() public {
        uint amount = deposits[msg.sender];
        require(amount > 0, "You have no deposits to withdraw.");

        deposits[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
