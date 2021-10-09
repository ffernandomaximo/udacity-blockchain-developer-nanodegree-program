var Web3 = require("web3");


//getBalance.
function getBalance(account) {
    var balance = web3.eth.getBalance(account, (err, bal) => { balance = bal });
    balance.then((result) =>  {
        accountBallanceEther = web3.utils.fromWei(result, 'ether');
        console.log(accountBallanceEther);
    }).catch((error) => {console.log(error)});
};

var url = "https://mainnet.infura.io/v3/ce1b404ad7334078bf3d10382c6966ee"
var web3 = new Web3(url)

var gasPrice = web3.eth.getGasPrice();
gasPrice.then((result) => {
    console.log(result);
});

const latest = web3.eth.getBlockNumber();
latest.then((result) => {
    web3.eth.getBlockTransactionCount(result).then(console.log);
});
