/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {

    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                           // Hash of the block
		this.height = 0;                                            // Block Height (consecutive number of each block)
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');   // Will contain the transactions stored in the block, by default it will encode the data
		this.time = 0;                                              // Timestamp for the Block creation
		this.previousBlockHash = null;                              // Reference to the previous Block Hash
    }
    
    validate() {
        let self = this;
        let comp = true;
        return new Promise((resolve, reject) => {
            let currentHash = self.hash;//"he = 417f3c7ac7ff466d63019ced5977312ee0098174e20b7af16d8668bc0ad2a6b4";
            if (self.body) {
                self.hash = `${SHA256(JSON.stringify(self.body))}`
                if (currentHash == self.hash) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
            // else {
            //     reject(Error("It is broken"));
            // }
        });
    }

    getBData() {
        let self = this;
        return new Promise((resolve, reject) => {
            if (self.previousBlockHash != null) {
                let dataDecoded = hex2ascii(self.body);
                resolve(JSON.parse(dataDecoded));
            }
            // else {
            //     reject(Error("It is broken"));
            // }
        });
    }

}

module.exports.Block = Block;                    // Exposing the Block class as a module