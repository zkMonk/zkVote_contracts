/* global artifacts */
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  const verifier = await ethers.getContractFactory("Verifier");

  const verifierContract = await verifier.deploy();

  const hasherContract = await hre.ethers.getContractFactory("Hasher");
  const hasherInstance = await hasherContract.deploy();

  const Voting = await ethers.getContractFactory("Voting");
  const MerkleTree = await ethers.getContractFactory("MerkleTreeWithHistory", {
    signer: deployer,
    libraries: {
      Hasher: hasherInstance.target,
    },
  });
  const MerkleTreeContract = await MerkleTree.deploy(20);
  const VotingTornado = await ethers.getContractFactory("VotingTornado", {
    signer: deployer,
    libraries: {
      Hasher: hasherInstance.target,
    },
  });

  const MERKLE_TREE_HEIGHT = 20;
  const TOKEN_AMOUNT = 10;

  const votingInstance = await Voting.deploy();

  const tornado = await VotingTornado.deploy(
    verifierContract.target,
    MERKLE_TREE_HEIGHT,
    deployer.address,
    votingInstance.target
  );
  console.log("VotingTornado's address ", tornado.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
