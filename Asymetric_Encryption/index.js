const keyops = require('./keyops');
const rsa = require("./rsa-crypt")
var readlineSync = require('readline-sync');

var p = async function () {
    try {
        option = readlineSync.question('options?' + "\n" + '1. Create ' + "\n" + '2. Encrypt and Decrypt' + "\n" + 'Enter your choices' + "\n");
        if (option == '1') {
            name = readlineSync.question("Enter your name : ")
            var k1 = await keyops.generateRSAKeys(name);
            console.log("Key-Pair", k1)
        } else if (option == '2') {
            name = readlineSync.question("Enter your name : ")
            data = readlineSync.question("Enter data to be encrypted : ")
            encryptedData = await rsa.encrypt(name, data)
            console.log("Encrypted Data : ", encryptedData)
            decryptedData = await rsa.decrypt(name, encryptedData)
            console.log("Decrypted Data : ", decryptedData)
        } else {
            console.log("Wrong Choice...!")
        }
    } catch (error) {
        console.log("Index FIle Error",error)
    }
}

p();