var prompt = require("prompt-sync")({sigint: true});

var Web3 = require("web3");

var url = "https://mainnet.infura.io/v3/ce1b404ad7334078bf3d10382c6966ee";
var web3 = new Web3(url);

/*
Step 1: Find an account using Etherscan
Step 2: Read the account balance of this account
Step 3: Convert the balance in wei to a balance in ether
Step 4: Get Transaction Count

*/

var address = prompt('enter address: ');

var accountBalance = web3.eth.getBalance(address, (err, bal) => { balance = bal });
accountBalance.then((result) =>  {
    accountBallanceEther = web3.utils.fromWei(result, 'ether');
    console.log(accountBallanceEther);
}).catch((error) => {console.log(error)});


var transactionCount = web3.eth.getTransactionCount(address, (err, tc) => { count = tc });
transactionCount.then(console.log);

