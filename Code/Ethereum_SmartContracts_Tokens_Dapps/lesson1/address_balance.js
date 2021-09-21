const prompt = require("prompt-sync")({sigint: true});

var Web3 = require("web3");

var url = "https://mainnet.infura.io/v3/ce1b404ad7334078bf3d10382c6966ee";
var web3 = new Web3(url);

var address = prompt('enter address: ');
var balance = web3.eth.getBalance(address, (err, bal) => { balance = bal });

balance.then((result) => {
	console.log(result);
}).catch((error) => {console.log(error)});