const Web3 = require("web3");

const New = async () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:8545")
  );
  const balance = await web3

  console.log(balance);
};
New();
