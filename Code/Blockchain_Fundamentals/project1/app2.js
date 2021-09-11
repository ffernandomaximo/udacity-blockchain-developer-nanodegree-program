const BlockClass = require('./src/block.js'); //Importing the Block class
const prompt = require("prompt-sync")({sigint: true});

const block = new BlockClass.Block(prompt('enter data: ')); //Creating a block object

block.validate().then((result) => {
	console.log(result);
}).catch((error) => {console.log(error)});

block.getBData().then((result) => {
	console.log(result);
}).catch((error) => {console.log(error)});