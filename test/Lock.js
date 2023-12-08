const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployVoting() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    //ethers.
    const Hasher = await ethers.getContractFactory("Hasher");
    const hash = await Hasher.deploy();
    //console.log("hasher", hash);
    // const Tornado = await ethers.deployContract("VotingTornado");
    // await Tornado.link(hash.address);
    // const voting = await ethers.deployContract("Voting");
    //const tornado = await Lock.deploy();

    //const Voting = await ethers.de("Voting");
    //const voting = await Voting.deploy();
    // const hasher = await Tornado.getAddress();
    // const votingaddr = await voting.getAddress();

    console.log(hash.target, owner.address, otherAccount.address);
    //return {} owner, otherAccount };
  }

  describe("Deployment", function () {
    deployVoting();
  });
});
