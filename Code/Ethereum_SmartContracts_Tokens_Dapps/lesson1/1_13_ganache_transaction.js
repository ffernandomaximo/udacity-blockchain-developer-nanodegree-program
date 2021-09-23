var Web3 = require("web3");
var EthereumTx = require('ethereumjs-tx').Transaction;
var Prompt = require("prompt-sync")({sigint: true});

//Ganache URL.
var url = "HTTP://127.0.0.1:7545"

//web3.
var web3 = new Web3(url)

//Sending and Receing account addresses.
var sendingAddress = "0xd9020bC7b6816Fb152e0572822bFD133BaC0e0cB";
var receivingAddress = Prompt("Receiver Address: ");

//Check whether addresses exist in Ganache.
//Check whether Sending account address is different from the Receiving. 
web3.eth.getAccounts().then((result) => {
    if (result.includes(receivingAddress)) {
        if (sendingAddress === receivingAddress) {
            console.log("ERROR: Receiver and Sender can't have the same address.");
        }
        else {
            console.log(":)")
        }
    }
    else {
        console.log("Either Sender or Receiver can't be found in Ganache.")
    }
}).catch((error) => {console.log(error)});

//transaction object
var rawTransaction = {
    nonce: 0,
    to: receivingAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: 1,
    data: "0x0"
};

//return balance from Sending and Receiving accounts.
// web3.eth.getBalance(sendingAddress).then(console.log); 
// web3.eth.getBalance(receivingAddress).then(console.log);

//Sign transaction by using the Private Key from Sending account.
var privateKeySender = "440594177c656e8052b7b8c4549b36bff45fac98dab1ea8be63ea2432e32694d"//Prompt("Sender Private Key: ");
var privateKeySenderHex = Buffer.from(privateKeySender, 'hex');
var transaction = new EthereumTx(rawTransaction)
transaction.sign(privateKeySenderHex)
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);
// 

