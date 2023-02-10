const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {ethers} = require('ethers')

app.use(bodyParser.json())
const port = 5000
const {Contract, providers} = require('ethers')
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545')

const abi = [
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
const contract = new Contract(contractAddress, abi, provider)

app.post('/withdraw', async (req, res) => {
    try {
        console.log('reading')
        const to = req.body.to;
        const tx = await contract.withdrawal(to);
        await tx.wait()
        res.send({success: true})
    } catch (error) {
        res.status(500).send({success: false, error: error.message})
    }
})

app.listen(port, () => {
    console.log(`Server is running at ${5000}`)
})