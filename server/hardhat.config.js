require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ganache");
module.exports = {
  defaultNetwork: process.env.TESTNET_RPC_NAME, // Set the default network here
  networks: {
    hardhat: {
      accounts: {
          mnemonic: process.env.SEED_PHRASE,
      },
      chainId: 1337,
  },
    polygon_mumbai: {
      url: process.env.TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
