require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: 'nestrpc',
  networks: {
    nestrpc: {
      url: 'http://127.0.0.1:8545',
    
    },
    
  }
};

// 0xF94f9a3407fF12734Ae3cD22de06cB03f306f371