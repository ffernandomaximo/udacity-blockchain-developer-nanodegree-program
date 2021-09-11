const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {
    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                               // Hash of the block
		this.height = 0;                                                // Block Height (consecutive number of each block)
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');  // Will contain the transactions stored in the block, by default it will encode the data
		this.time = 0;                                                  // Timestamp for the Block creation
		this.previousBlockHash = null;                                  // Reference to the previous Block Hash
    }
    
    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            let currentHash = self.hash;                                //"he = 417f3c7ac7ff466d63019ced5977312ee0098174e20b7af16d8668bc0ad2a6b4";
            self.hash = `${SHA256(JSON.stringify(self.body))}`
            if (currentHash === self.hash) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }

    getBData() {
        let self = this;
        return new Promise((resolve, reject) => {
            if (self.previousBlockHash != null) {
                let dataDecoded = hex2ascii(self.body);
                resolve(JSON.parse(dataDecoded));
            }
            else {
                reject(Error("It broke"));
            }
        });
    }
}

module.exports.Block = Block;                                           // Exposing the Block class as a module