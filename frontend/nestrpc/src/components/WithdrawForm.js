import React, { useState } from 'react';
import axios from 'axios';
import { Contract, JsonRpcProvider } from 'ethers';
import { Signer } from 'ethers';
import Web3 from "web3"
const web3provider = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:8545"))

const ContractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "contractOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "transfer",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "withdrawal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const contractAddress = "0x87658a6c698D1392d45B0AB756F969361AcB912d"
const TokenContract = new Contract(contractAddress, ContractABI, web3provider)
function WithdrawButton() {
  const [balance, setBalance] = useState(0);
  const [success, setSuccess] = useState(false)

  async function handleWithdraw() {
    try {
      const contractOwner = await TokenContract.contractOwner();
    //   const signerAddress = await signer.getAddress();
      const network = await web3provider.getNetwork();
  
      // Check the signer is the owner of the contract
    //   if (signerAddress !== contractOwner) {
    //     throw new Error("Signer is not the owner of the contract");
    //   }
  
      // Check the signer is connected to the correct network chain ID
      if (network.chainId !== 4224) {
        throw new Error(`Signer is not connected to the correct network. Expected: ${4224} Found: ${network.chainId}`);
      }
  
    //   // Execute the withdrawal function
    //   await TokenContract.withdrawal(signer.address);
    //   setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }
  
  
  

  return (
    <div>
      <input type="text" value={balance} onChange={(e) => setBalance(e.target.value)} />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}

export default WithdrawButton;
