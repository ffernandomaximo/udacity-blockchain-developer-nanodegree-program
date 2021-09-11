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
            try {
                // Save in auxiliary variable the current block hash
                const currentHash = self.hash;
                self.hash = null;
                // Recalculate the hash of the Block
                const newHash = SHA256(JSON.stringify(self)).toString();
                self.hash = currentHash;
                // Comparing if the hashes changed and return true or false
                resolve(currentHash === newHash);
            } catch (err) {
                reject(new Error(err)); 
            }
        });
    }

    getBData() {
        let self = this;
        return new Promise( async (resolve, reject) => {          
            let enc_data = self.body;       // Getting the encoded data saved in the Block                                    
            let dec_data = hex2ascii(enc_data); // Decoding the data to retrieve the JSON representation of the object
            let decdata_in_JSON=JSON.parse(dec_data); // Parse the data to an object to be retrieve.
            // Resolve with the data if the object isn't the Genesis block
            if (self.height == 0) {
                //This is the genesis block as height == 0
                resolve("This is the Genesis block dude");
            } else {
                resolve(decdata_in_JSON);
            }
        });

    }
}

module.exports.Block = Block;                                           // Exposing the Block class as a module