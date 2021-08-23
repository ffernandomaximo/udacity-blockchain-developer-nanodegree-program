//installing package: npm install crypto-js
var SHA256 = require("crypto-js/sha256"); //returns a function
var prompt = require("prompt-sync")({sigint: true});

const data1 = prompt('enter data: ')//"Blockchain Rock!";
const dataObject = {
	id: 1,
  	body: "With Object Works too",
  	time: new Date().getTime().toString().slice(0,-3)
};

function generateHash(obj) { //creating a function from the SHA256()
    return SHA256(obj)
}


// console.log(generateHash(JSON.stringify(data1)));

console.log(`SHA256 Hash: ${generateHash(JSON.stringify(data1))}`);
console.log("************************************");
//a new hash is generate every second as the time propetiy changes
console.log(`SHA256 Hash: ${generateHash(JSON.stringify(dataObject))}`); 