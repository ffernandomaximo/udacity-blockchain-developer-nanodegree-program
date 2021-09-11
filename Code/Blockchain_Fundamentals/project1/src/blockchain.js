//https://brax.gg/project-1-create-your-own-private-blockchain/?utm_source=rss&utm_medium=rss&utm_campaign=project-1-create-your-own-private-blockchain
const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');

class Blockchain { //ok
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    async initializeChain() { //ok
        if( this.height === -1){
            let block = new BlockClass.Block({data: 'Genesis Block'});
            await this._addBlock(block);
        }
    }

    getChainHeight() { //ok
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    _addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            block.height = self.chain.length; //get current height
            block.time = new Date().getTime().toString().slice(0,-3); //get current time
            if(self.chain.length>0){
                block.previousBlockHash = self.chain[self.chain.length-1].hash; //get previous hash
            }
            block.hash = SHA256(JSON.stringify(block)).toString(); //calculate hash
            //Validation
            console.debug('validation of chain starts here');
            let errors = await self.validateChain(); //call the validate chain method
            console.log(errors)
            console.debug('Validation of chain ended')
            if (errors.length === 0 ){ //if no errors in blockchain
                self.chain.push(block); //push new block
                self.height++; //increment height
                console.debug(block)
                resolve(block) //resolve the new block
            } else{
                reject(errors);
            }
        });
    }

    requestMessageOwnershipVerification(address) { //ok
        return new Promise((resolve) => {
            let message = `${address}:${new Date().getTime().toString().slice(0,-3)}:starRegistry`;
            resolve(message);
        });
    }

    submitStar(address, message, signature, star) { //ok
        let self = this;
        return new Promise(async (resolve, reject) => {
            let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
            if ((parseInt(self.message.split(':')[1]) + (5*60*1000)) > currentTime) {
                 if(bitcoinMessage.verify(message, address, signature)) {
                    let block = new BlockClass.Block({"owner": address, "star": star});
                    let newBlock = await self._addBlock(block);
                    resolve(newBlock);
                } else {
                    reject(Error("SIGNATURE IS NOT VALID")) 
                }
            }
            else {
                reject(Error("TRANSACTION TOOK MORE THAN 5 MINUTES")) 
            }
        });
    }

    getBlockByHash(hash) {//ok
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(p => p.hash === hash)[0];
            if(block){
                resolve(block);
            } else {
                reject(Error("NO BLOCK FOUND"));
            }
        });
    }

    getBlockByHeight(height) { //ok
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(p => p.height === height)[0];
            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    getStarsByWalletAddress (address) { //ok
        let self = this;
        let stars = [];
        return new Promise((resolve, reject) => {
            self.chain.forEach(async(b) => {
                let star = await b.getBData(); //decoded star name
                if(star){
                    if (star.owner === address){
                        stars.push(star);
                    }
                }
            });
            resolve(stars);
        });
    }

    validateChain() {
        let self = this;
        let errorLog = [];
        return new Promise((resolve) => {
            // Go through each block and make sure stored hash of
            // previous block matches actual hash of previous block
            let validatePromises = [];
            self.chain.forEach((block, index) => {
                if (block.height > 0) {
                    const previousBlock = self.chain[index - 1];
                    if (block.previousBlockHash !== previousBlock.hash) {
                        const errorMessage = `Block ${index} previousBlockHash set to ${block.previousBlockHash}, but actual previous block hash was ${previousBlock.hash}`;
                        errorLog.push(errorMessage);
                    }
                }

                // Store promise to validate each block
                validatePromises.push(block.validate());
            });

            // Collect results of each block's validate call
            Promise.all(validatePromises)
                .then(validatedBlocks => {
                    validatedBlocks.forEach((valid, index) => {
                        if (!valid) {
                            const invalidBlock = self.chain[index];
                            const errorMessage = `Block ${index} hash (${invalidBlock.hash}) is invalid`;
                            errorLog.push(errorMessage);
                        }
                    });

                    resolve(errorLog);
                });
        });
    }
}

module.exports.Blockchain = Blockchain;   