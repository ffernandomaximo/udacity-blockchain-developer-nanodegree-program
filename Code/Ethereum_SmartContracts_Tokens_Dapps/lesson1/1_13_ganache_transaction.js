var Web3 = require("web3");
var EthereumTx = require('ethereumjs-tx').Transaction;
var Prompt = require("prompt-sync")({sigint: true});

//getBalance.
function getBalance(account) {
    var balance = web3.eth.getBalance(account, (err, bal) => { balance = bal });
    balance.then((result) =>  {
        accountBallanceEther = web3.utils.fromWei(result, 'ether');
        console.log(accountBallanceEther);
    }).catch((error) => {console.log(error)});
};

//Ganache URL.
var url = "HTTP://127.0.0.1:7545"

//web3.
var web3 = new Web3(url)

//Sending and Receing account addresses.
var sendingAccount = "0x2651EA85CFb6c9eFb3993D8aED683002E15cBfA6";
var receivingAccount = Prompt("Receiver Address: ");

//Check whether addresses exist in Ganache.
//Check whether Sending account address is different from the Receiving. 
web3.eth.getAccounts().then((result) => {
    if (result.includes(receivingAccount)) {
        if (sendingAccount === receivingAccount) {
            console.log("ERROR: Sender and Receiver can't have the same address.");
        }
        else {
            console.log(":)")
        }
    }
    else {
        console.log("Either Sender or Receiver can't be found in Ganache.")
    }
}).catch((error) => {console.log(error)});

var sendingTransactionCount = new Promise((resolve) => {
    resolve(web3.eth.getTransactionCount(sendingAccount))
});

//transaction object
async function createTransaction() {
    var rawTransaction = {
        nonce: '0x'.concat(await sendingTransactionCount),
        to: receivingAccount,
        gasPrice: 20000000,
        gasLimit: 30000,
        value: 100000,
        data: '0x0'
    };
    return rawTransaction;
}

//Sign transaction by using the Private Key from Sending account.
createTransaction().then(rawTransaction => {
    console.log(rawTransaction)
    var privateKeySender = "5b0a4730ec2738b8612153c2bcf3408c31ffa5ba48ade3e7bf1454ca92e9de32"//Prompt("Sender Private Key: ");
    var privateKeySenderHex = Buffer.from(privateKeySender, 'hex');
    var transaction = new EthereumTx(rawTransaction)
    transaction.sign(privateKeySenderHex)
    var serializedTransaction = transaction.serialize();
    web3.eth.sendSignedTransaction(serializedTransaction);
});

getBalance(sendingAccount);
getBalance(receivingAccount);