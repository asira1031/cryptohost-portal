
import "dotenv/config";
import "@nomicfoundation/hardhat-ethers";

export default {
  solidity: "0.8.20",

  networks: {
    mainnet: {
      type: "http",
      url: process.env.MAINNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

