//installing package: npm install crypto-js
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data){
        this.id = 0;
        this.nonce = 144444;
        this.body = data;
        this.hash = "";
    }

    generateHash() {
        let self = this;
        // console.log(`SHA256 Hash: ${SHA256(JSON.stringify(self.body))}`);

        var promise = new Promise(function(resolve, reject) {
            if (self.body) {
                resolve(self.hash = `${SHA256(JSON.stringify(self.body))}`)
                // resolve(self.hash = SHA256(self.body));
            }
            else {
                reject(Error("It broke"));
            }
        });
        return promise;
    }
}
 
 // Exporting the class Block to be reuse in other files
module.exports.Block = Block;