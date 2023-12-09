# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

# Tornado Vote Privacy Solution based on Tornado Cash

Tornado Vote is a privacy voting solution based on outstanding [Tornado Cash](https://tornado.cash) that utilizes zkSNARKs.

## Installation

Currently, solution is designed and tested for hardhat.

Deploy to local network:

```
npx hardhat run scripts/deploy.js
```

Test

```
npx hardhat test
```

## CLI

Please copy .env.exampe to .env

OWNER_PRIVATE_KEY is a private key for contract owner account.

PRIVATE_KEY is default private key for user account

### Options

-A \<address> address is hardhat account number, ethereum address starting with 0x or word "new" for new address. 0.1 ETH will be sent to new account from OWNER address automatically.

-r \<rpc> ethereum node host. "http://127.0.0.1:8545/" is the defualt value

### Commands

#### Intitialization

```
node ./cli.js setTornado
```

before we start we need to initialize voting comntract to allow Tornado contract managing votes

#### Account information

```
node ./cli.js accounts
Account #0 Address 0x3a2ACb7D59B441bE9aB3d1f095D59132E39ACd11
Account #1 Address 0x58727631C1D0363f638A63539f9c1fcaeb83b8fE
Account #2 Address 0xc323BbA7183C7C8cB85c7Cb757E5bF5AC5394040
Account #3 Address 0xE5766F90d60115062accAb8A81c37c4A50054ef1
Account #4 Address 0xf21E0A4296f313489f9780464BF5Ee746867Eb85
Account #5 Address 0x9db0A13ADDAB1A7492aC9Fb458eE61e9C50C95C6
Account #6 Address 0x0B744367725607668DC79dB7e55120Ef9f1b967a
Account #7 Address 0x6CeC16897e5d18a6bd72Cd115F60368E643fdfea
Account #8 Address 0x477767F6E5176BDC5f34C15404B4aD83F0e23742
Account #9 Address 0x8B82EBbb158FB24649348eA497eE0F573da85Aba
Active address: 0x58727631C1D0363f638A63539f9c1fcaeb83b8fE

```

#### votingInfo

node ./cli.js votingInfo \<votingId>

Displays voting information

#### createVoting

node ./cli.js createVoting \<optionsCounter> \<nomination>

Creates voting

optionsCounter number of voting options

nomination value of one ballot

```
node ./cli.js createVoting 3 1
Voting created. ID :  4
node ./cli.js votingInfo 4
Getting voting info. ID :  4

=============Voting=================
Creator               : 0x3a2ACb7D59B441bE9aB3d1f095D59132E39ACd11
Number of options     : 3
Nomination            : 1
Total votes           : 0
=============Options================
Option 0 votes        : 0
Option 1 votes        : 0
Option 2 votes        : 0
====================================
```

This sample create voting with three options, each ballot adds 1 vote to chosen option

#### getVotes

node ./cli.js getVotes \<votingId>

Getting number of votes available for address

#### addVotes

node ./cli.js addVotes \<votingId> \<votesNumber>

Add votes to specified address. Transaction is performed by OWNER

```
node ./cli.js -A 5 addVotes 4 10
Using account  0x9db0A13ADDAB1A7492aC9Fb458eE61e9C50C95C6

node ./cli.js votingInfo 4
Getting voting info. ID :  4

=============Voting=================
Creator               : 0x3a2ACb7D59B441bE9aB3d1f095D59132E39ACd11
Number of options     : 3
Nomination            : 1
Total votes           : 10
=============Options================
Option 0 votes        : 0
Option 1 votes        : 0
Option 2 votes        : 0
====================================

node ./cli.js -A 5 getVotes 4
Using account  0x9db0A13ADDAB1A7492aC9Fb458eE61e9C50C95C6
Available votes 10

```

This sample adds 10 votes to account #5

#### ballot \<votingId>

node ./cli.js ballot \<votingId>

Converts votes to ballot

```
node ./cli.js -A 5 ballot 4
Your ballot: tornado-4-1592692982076-0x6b3afc57725b0729801669e8fb609d27905af85b389e5bb587bb41991934a7cebbd978d076f9f091be46018c9a8017be2f1e5e283ad4386f810d13584a3904000000000000000000000000000000000000000000000000000000000000
Submitting deposit transaction
The transaction hash is 0x635993c940f986497bc44e5e2a1a92fccd44f3a2ce1fc9bc4dd9c3561034b30b
./cli.js -A 5 getVotes 4
Using account  0x9db0A13ADDAB1A7492aC9Fb458eE61e9C50C95C6
Available votes 9
```

Account #5 withdraws ballot that is:

```
tornado-4-1592692982076-0x6b3afc57725b0729801669e8fb609d27905af85b389e5bb587bb41991934a7cebbd978d076f9f091be46018c9a8017be2f1e5e283ad4386f810d13584a3904000000000000000000000000000000000000000000000000000000000000
```

### vote

node ./cli.js vote \<ballot> \<option>

Use the ballot with selected option

```
node ./cli.js -A new vote tornado-4-1592692982076-0x6b3afc57725b0729801669e8fb609d27905af85b389e5bb587bb41991934a7cebbd978d076f9f091be46018c9a8017be2f1e5e283ad4386f810d13584a3904000000000000000000000000000000000000000000000000000000000000 2
Using account  0x06c03CF282b0cB9F223222bf92dEe95ea8Ce3A0d
using private key 4
Getting current state from tornado contract
Generating SNARK proof
Proof time: 6330.094ms
Submitting withdraw transaction 2
The transaction hash is 0xca8644097f065e42d0a1f9505dc1041a331c48e9eeaa2384efa7052a8d172aeb
Done
```

New account votes with ballot in voting 4 for option 2

```
Getting voting info. ID :  4

=============Voting=================
Creator               : 0x3a2ACb7D59B441bE9aB3d1f095D59132E39ACd11
Number of options     : 3
Nomination            : 1
Total votes           : 20
=============Options================
Option 0 votes        : 0
Option 1 votes        : 0
Option 2 votes        : 1
====================================
```

#### compliance

node ./cli.js compliance \<ballot>

displays the ballot information

```
node ./cli.js compliance tornado-4-1592692982076-0x6b3afc57725b0729801669e8fb609d27905af85b389e5bb587bb41991934a7cebbd978d076f9f091be46018c9a8017be2f1e5e283ad4386f810d13584a3904000000000000000000000000000000000000000000000000000000000000

=============Ballot==================
Deposit     : undefined undefined
Date        : 12/09/2023 7:14:44 PM
From        : 0x9db0a13addab1a7492ac9fb458ee61e9c50c95c6
Transaction : 0x635993c940f986497bc44e5e2a1a92fccd44f3a2ce1fc9bc4dd9c3561034b30b
Commitment  : 0x20f863c511daa535f605e62200ed24d36e81141d613e30dba440156c57e26201

=============Vote====================
VotingId    : 4
Date        : 12/09/2023 7:18:48 PM
From        : 0x06c03cf282b0cb9f223222bf92dee95ea8ce3a0d
Transaction : 0xca8644097f065e42d0a1f9505dc1041a331c48e9eeaa2384efa7052a8d172aeb
Nullifier   : 0x002a01d05f87ffd7f42f7a462ff77a3089e764441934e525ccd22afd84003d1b

=====================================
```
