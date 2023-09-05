require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");



/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();

const { sepolia_api_key_url, metamask_private_key,ETHERSCAN_API_KEY } = process.env;
module.exports = {
  solidity: "0.8.19",
  // default n etwork hardhat configuration
  defaultNetwork: "hardhat",
  // sepolia testnet network configuration
  networks: {
    sepolia: {
      url: sepolia_api_key_url,
      accounts: [metamask_private_key],
    },
  },
  // contract verification
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

};



