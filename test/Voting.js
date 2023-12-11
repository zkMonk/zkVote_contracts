const { ethers } = require("hardhat");
const { expect } = require("chai");

// Import other necessary dependencies and contracts...

describe.only("VotingTornado", async function () {
  let tornado;
  let voting;
  const [deployer, user1, user2, relayer] = await ethers.getSigners();
  const MERKLE_TREE_HEIGHT = 20;
  const ETH_AMOUNT = 1;
  const levels = MERKLE_TREE_HEIGHT || 16;
  const value = ETH_AMOUNT || ethers.utils.parseEther("1");
  let snapshotId;
  let prefix = "test";
  let tree;
  // const fee = ethers.BigNumber.from(0);
  // const refund = ethers.BigNumber.from(0);
  //const recipient = getVotingId(1);
  //const badRecipient = getVotingId(2);
  let groth16;
  let circuit;
  let proving_key;

  before(async () => {
    tree = new MerkleTree(levels, null, prefix);
    const Tornado = await ethers.getContractFactory("VotingTornado");
    tornado = await Tornado.deploy();
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();

    await voting.setTornado(tornado.address);
    await voting.createVoting(2, 1);
    await voting.addVotes(1, user2.address, 10);
    await voting.addVotes(1, user3.address, 5);

    snapshotId = await ethers.provider.send("evm_snapshot", []);
    groth16 = await buildGroth16();
    circuit = require("../build/circuits/withdraw.json");
    proving_key = fs.readFileSync(
      "build/circuits/withdraw_proving_key.bin"
    ).buffer;
  });

  describe("snark proof verification on js side", () => {
    it("should detect tampering", async () => {
      // Your test logic...
    });
  });

  describe("#get ballot", () => {
    it("should emit event", async () => {
      const commitment = toFixedHex(42);
      const tx = await tornado.getBallot(commitment, 1, {
        from: user2.address,
      });
      await tx.wait();

      const events = await voting.queryFilter("Ballot", tx.blockHash);
      expect(events.length).to.equal(1);
      expect(events[0].args.commitment).to.equal(commitment);
      expect(events[0].args.leafIndex).to.eq.BN(0);
    });

    it("should throw if there is a such commitment", async () => {
      const commitment = toFixedHex(42);
      await tornado.getBallot(commitment, 1, { from: user2.address }).should.be
        .fulfilled;
      await tornado
        .getBallot(commitment, 1, { from: user2.address })
        .should.be.rejectedWith("The commitment has been submitted");
    });
  });

  describe("#vote", () => {
    it("should work", async () => {
      // Your test logic...
    });
  });

  afterEach(async () => {
    await ethers.provider.send("evm_revert", [snapshotId]);
    snapshotId = await ethers.provider.send("evm_snapshot", []);
    tree = new MerkleTree(levels, null, prefix);
  });
});
