const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');

class Blockchain {
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    async initializeChain() {
        if( this.height === -1){
            let block = new BlockClass.Block({data: 'Genesis Block'});
            await this._addBlock(block);
        }
    }

    getChainHeight() {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    _addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            let blockObj = block;
            let height = await self.getChainHeight();
            blockObj.time = new Date().getTime().toString().slice(0,-3);
            if(height >= 0){
                blockObj.height = height + 1;
                let previousBlock = self.chain[self.height];
                blockObj.previousBlockHash = previousBlock.hash;
                // Verify signature
                blockObj.hash = SHA256(JSON.stringify(blockObj)).toString();
                self.chain.push(blockObj);
                self.height = self.chain.length -1;
                resolve(blockObj);
            } else {
                // Only for the Genesis Block
                blockObj.height = height + 1;
                blockObj.hash = SHA256(JSON.stringify(blockObj)).toString();
                self.chain.push(blockObj);
                self.height = self.chain.length - 1;
                resolve(blockObj);
            }
           
        });
    }

    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            let message = `${address}:${new Date().getTime().toString().slice(0,-3)}:starRegistry`;
            resolve(message);
        });
    }

    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
            
            if ((parseInt(self.message.split(':')[1]) + (5*60*1000)) > currentTime) {
                 if(bitcoinMessage.verify(message, address, signature)) {
                    let block = new BlockClass.Block({owner: address, star: star});
                    let newBlock = await self._addBlock(block);
                    resolve(newBlock);
                } else {
                    reject('Error: signature is not valid');
                }
            }
            else {
                reject('Error: transaction took more than 5 minutes')
            }
        });
    }

    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
            resolve(self.chain.filter(p => p.hash === hash))[0];
            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    getBlockByHeight(height) {
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

    getStarsByWalletAddress (address) {
        let self = this;
        let stars = [];
        return new Promise((resolve, reject) => {
            self.chain.forEach((ar) => {
                let star = ar.getBData(); //decoded star name
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
        return new Promise(async (resolve, reject) => {
            let promises = [];
            let index = 0;
            self.chain.forEach(block => {
                promises.push(block.validate());
                if(block.height > 0) {
                    let previousBlockHash = block.previousBlockHash;
                    let blockHash = self.chain[index-1].hash;
                    if(blockHash != previousBlockHash){
                            errorLog.push(`Error: Block ${block.height}. Previous hash doesn't match the with hash from previous block.`);
                    }
                }
                index++;
            });
            Promise.all(promises).then((results) => {
                index = 0;
                results.forEach(valid => {
                    if(!valid){
                        errorLog.push(`Error: Block ${self.chain[index].height} is tampered.`);
                    }
                    index++;
                });
                resolve(errorLog);
            }).catch((err) => { console.log(err); reject(err)});
        });
    }
}

module.exports.Blockchain = Blockchain;   