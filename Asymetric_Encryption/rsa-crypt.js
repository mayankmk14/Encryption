const keyops = require('./keyops');
const nodeRSA = require('node-rsa');


var encrypt = async function (username, data) {
    try {
        pub = await keyops.getRSAPublicKey(username)
        pubEncrypter = new nodeRSA(pub)
        var dataE = await pubEncrypter.encrypt(data, "base64")
        return dataE;
    } catch (error) {
        console.log("encrypt catch", error)
        return;
    }
}

var decrypt = async function (username, data) {
    try {
        priv = await keyops.getRSAPrivateKey(username)
        privDecrypter = new nodeRSA(priv)
        var dataD = privDecrypter.decrypt(data, "utf8")
        return dataD;
    } catch (error) {
        console.log("Decrypt catch", error)
    }
}



module.exports = {
    decrypt: decrypt,
    encrypt: encrypt
};