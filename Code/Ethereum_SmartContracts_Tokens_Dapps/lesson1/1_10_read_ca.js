var prompt = require("prompt-sync")({sigint: true});

var Web3 = require("web3");

var url = "https://mainnet.infura.io/v3/ce1b404ad7334078bf3d10382c6966ee";
var web3 = new Web3(url);

/*
Step 1: Set a variable ABI to the value of the ABI (application binary interface) in the contract code.
Step 2: Set the address of the contract to a variable named contractAddress.
Step 3: ABI and Contract Address - web3.eth.Contract
Step 4: View the details of the contract.
Step 5: View the methods from the contract
Step 6: Call methods for this contract from your terminal.
*/

var abiJSON = prompt('enter ABI: ');
var abi = JSON.parse(abiJSON);
var contractAddress = prompt('enter contract address: ');

var contract = new web3.eth.Contract(abi, contractAddress);
// console.log(contract);

// console.log(contract.methods);

// contract.methods.name();
contract.methods.name().call((err, result) => { console.log(result)});
contract.methods.symbol().call((err, result) => { console.log(result )});
contract.methods.totalSupply().call((err, result) => { console.log(result )});