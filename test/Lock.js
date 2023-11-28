const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployVoting() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Tornado = await ethers.getContractFactory("VotingTornado");
    const tornado = await Lock.deploy();

    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    console.log(tornado, owner, voting, otherAccount);
    return { tornado, owner, voting, otherAccount };
  }

  describe("Deployment", function () {
    deployVoting();
  });
});
