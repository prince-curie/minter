#!/usr/bin/env node

const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
var inquirer = require('inquirer');

// console.log()
// const MNEMONIC = process.env.MNEMONIC;
// const NODE_API_KEY = process.env.NODE_API_KEY;
// const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
// const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
// const NETWORK = process.env.NETWORK;
// const NUM_CREATURES = process.env.NUM_CREATURES;
// const CONTRACT_BUILD_PATH = process.env.CONTRACT_BUILD_PATH

// if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
//   console.error(
//     "Please set up your config file."
//   );
//   return;
// }

// const NFT_ABI = JSON.parse(fs.readFileSync(CONTRACT_BUILD_PATH).toString()).abi;

const questions = [
  {
    type: 'input',
    name: 'config_link',
    message: 'Input the link to the config file'
  },
  {
    type: 'input',
    name: 'function_name',
    message: 'What is the name of your minting function'
  },
  {
    type: 'input',
    name: 'function_arguments',
    message: 'Input the arguments for your minting function as they exist'
  }
]

async function main() {
  const answers = await inquirer.prompt(questions);
  return console.log(answers)

  const network = NETWORK;
  const provider = new HDWalletProvider( MNEMONIC, "https://" + network + ".infura.io/v3/" + NODE_API_KEY);
  const web3Instance = new web3(provider);

if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    // Creatures issued directly to the owner.
    for (var i = 1; i < NUM_CREATURES; i++) {
      const result = await nftContract.methods
        .mint(OWNER_ADDRESS, 14)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted. Transaction: " + result.transactionHash);
    }

    console.log('\n', 'Minting completed!!');
    process.exit(0);
  } else {
    console.error(
      "Add NFT_CONTRACT_ADDRESS to the environment variables"
    );
  }
}

main();