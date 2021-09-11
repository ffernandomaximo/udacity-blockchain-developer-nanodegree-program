const BlockClass = require('./src/block.js'); //Importing the Block class
const prompt = require("prompt-sync")({sigint: true});
const BlockChain = require('./src/blockchain.js');

const block = new BlockClass.Block(prompt('enter data: ')); //Creating a block object
const blockchain = new BlockChain.Blockchain();


block.validate().then((result) => {
	console.log(result);
}).catch((error) => {console.log(error)});

blockchain._addBlock(block).then((result) => {
	console.log(result);
    blockchain.getBlockByHash(block.hash).then((result) => {
        console.log(result);
    }).catch((error) => {console.log(error)});
}).catch((error) => {console.log(error)});

// blockchain.requestMessageOwnershipVerification(block).then((result) => {
// 	console.log(result);
// }).catch((error) => {console.log(error)});

// blockchain.getBlockByHash(block.hash).then((result) => {
// 	console.log(result);
// }).catch((error) => {console.log(error)});