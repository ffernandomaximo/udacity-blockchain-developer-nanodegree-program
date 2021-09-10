/* 
Step 1: Get access to the file system.
Step 2: Read the image file.
Step 3: Encode the image as hex.
Step 4: Output the encoded data to the console.

https://nodejs.org/api/buffer.html
*/

// Require file system access
const fs = require('fs')

//My Code
fs.readFile('test-pattern.jpg', 'hex' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    //Udacity Code
    // Read file buffer 
    imgReadBuffer = fs.readFileSync('test-pattern.jpg');
    // Encode image buffer to hex
    imgHexEncode = new Buffer(imgReadBuffer).toString('hex');

    if (data===imgHexEncode){
        console.log("same Hex");
    }

    // Decode hex
    var imgHexDecode = new Buffer(imgHexEncode, 'hex');

    // Save decoded file file system 
    fs.writeFileSync('decodedHexImage.jpg', imgHexDecode);

})