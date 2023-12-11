require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.5.17",
  networks: {
    polygon: {
      url: "https://rpc-mumbai.maticvigil.com" || "",
      accounts: ["Process.env.PRIVATE_KEY"],
    },
  },
};
