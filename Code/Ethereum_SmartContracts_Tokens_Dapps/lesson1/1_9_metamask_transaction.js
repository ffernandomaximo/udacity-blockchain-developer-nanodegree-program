var Web3 = require("web3");

var url = "https://rinkeby.infura.io/v3/ce1b404ad7334078bf3d10382c6966ee"; //rinkeby
var web3 = new Web3(url);

/*
Step 1: open metamask and find the transaction that sent the test ether.
Step 2: search that transaction on the appropriate test network using etherscan.
Step 3: search the balance of the address shown on for this transaction using web3.
Step 4: compare the transaction amount with the balance shown to see if they are the same.
*/

var transaction = web3.eth.getTransaction('0xe6e47f429b040b5769d531e6d128ce222c39dc43f8caf3f6a0f1ae86dfd7dbf4');

transaction.then((result) =>  {
    from = result.from;
    balanceFrom = web3.eth.getBalance(from);
    balanceFrom.then(console.log);
}).catch((error) => {console.log(error)});