// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import './MerkleTreeWithHistory.sol';

contract MerkleTreeWithHistoryMock is MerkleTreeWithHistory {

  constructor (uint32 _treeLevels) MerkleTreeWithHistory(_treeLevels) public {}

  function insert(bytes32 _leaf) public {
      _insert(_leaf);
  }
}
