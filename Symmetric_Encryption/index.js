const file = require("./aesUtils")



var some = async () => {
    console.log("Demo AES-Encryption")
    let aes = await file.generateAES()
    console.log("Demo String : My name is Mayank Saxena")
    encpt = await file.encrypt(aes,"My name is Mayank Saxena")
    console.log("Encrypt",encpt)
    decrypt = await file.decrypt(aes,encpt)
    console.log("Decrypt",decrypt)
};

some();
