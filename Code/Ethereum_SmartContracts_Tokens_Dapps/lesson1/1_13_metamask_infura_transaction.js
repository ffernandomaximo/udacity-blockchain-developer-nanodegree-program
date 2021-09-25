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

var url = "https://rinkeby.infura.io/v3/ce1b404ad7334078bf3d10382c6966ee"
var web3 = new Web3(url)


var sendingAccount = "0x9D7a915B80c4345AeB98b70Df59feD0Eb37CF7Ef";
var receivingAccount = "0x0b6A4Bd14D7929a0a9d8eD4C7C1f4DA1c313885e";

var sendingTransactionCount = new Promise((resolve) => {
    resolve(web3.eth.getTransactionCount(sendingAccount))
});

getBalance(sendingAccount);
getBalance(receivingAccount);

var privateKeySender = '46d45370c55258db4bb5d89382e79c232903fe6422c05404cf4da366d0ed7153'
var privateKeySenderHex = Buffer.from(privateKeySender, 'hex');

async function createTransaction() {
    var rawTransaction = {
        nonce: '0x'.concat(await sendingTransactionCount),
        gasPrice: '0x1000000015',
        gasLimit: '0x30000',
        to: receivingAccount,
        value: '0x4000000000',
        data: '0x00',
    }

    return rawTransaction;
}

createTransaction().then(rawTransaction => {
    var tx = new EthereumTx(rawTransaction, {chain:'rinkeby'});

    if(!web3.eth.net.isListening()){ //await web3@0.20.5
        console.log("notconnected");
        process.exit();
    } else {
        tx.sign(privateKeySenderHex);
        var serializedTx = tx.serialize();
        
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')) //750 seconds to be mined
        .on('receipt', console.log);
    }
});
    