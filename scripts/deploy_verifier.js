const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const verifier = await ethers.getContractFactory("Verifier");
  const verifierContract = await verifier.deploy();

  console.log("Verifier Contract deployed to:", verifierContract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//0x5FbDB2315678afecb367f032d93F642f64180aa3
