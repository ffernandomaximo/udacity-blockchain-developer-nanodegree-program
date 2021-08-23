const BlockClass = require('./2_1_8_block.js'); //Importing the Block class
const prompt = require("prompt-sync")({sigint: true});

const block = new BlockClass.Block(prompt('enter data: ')); //Creating a block object

// Generating the block hash
block.generateHash().then((result) => {
	console.log(`Block Hash: ${result.hash}`);
	console.log(`Block: ${JSON.stringify(result)}`);
}).catch((error) => {console.log(error)});

console.log(block);