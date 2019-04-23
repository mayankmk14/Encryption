const nodeRSA = require('node-rsa');
const keyDirPath = `${__dirname}/keys`;
const RSA_BIT_SIZE = 1024;
const util = require('util');
const fs = require('fs-extra')
const path = require('path');

fs.ensureDirSync(path.join(__dirname))

// ----- rsa | start | -----

var getRSAPrivateKey = async function (username) {
    try {
        let filepath = path.join(keyDirPath, username + 'private.pem');
        if (!fs.existsSync(filepath)) {
            throw new Error("RSA Private FIle not Found");
        }
        readPriv = fs.readFileSync(filepath).toString()
        return readPriv
    } catch (error) {
        console.log("Catching getRSAPrivateKey",error) 
    }
};

var getRSAPublicKey = function (username) {
    try {
        let filepath = path.join(keyDirPath, username + 'public.pem');
        if (!fs.existsSync(filepath)) {
            throw new Error(" RSA Public FIle not Found")
        }
        readPub = fs.readFileSync(filepath).toString()
        return readPub
    } catch (error) {
        console.log("Catching getRSAPublicKey",error) 
        return;
    }
};


//generates RSA key-pair
var generateRSAKeys = async function (username) {
    try {
        console.log("Generating RSA Key-Pair")
        var keyPair = {};
        var rsa = new nodeRSA({
            b: RSA_BIT_SIZE
        });
        keyPair.public = rsa.exportKey("public");
        keyPair.privateKey = rsa.exportKey("pkcs1");

        let filePathRSAPublic = path.join(keyDirPath, username + 'public.pem')
        let filePathRSAPrivate = path.join(keyDirPath, username + 'private.pem')
        await fs.writeFileSync(filePathRSAPublic, keyPair.public)
        fs.writeFileSync(filePathRSAPrivate, keyPair.privateKey)
        return (keyPair);
    } catch (error) {
        console.log("error during generating RSA keys and storing to file",error);
    }
};

var getRSAKeys = async function (username) {
    var keyPair = {};
    try {
        keyPair.privateKey = await getRSAPrivateKey(username);
        keyPair.public = await getRSAPublicKey(username);
        return keyPair;
    } catch (error) {
        console.log("Unable to fetch...generating New Key-pair", error)
        try {
            let keyPair = await generateRSAKeys(username);
            return (keyPair);
        } catch (error) {
            console.log("getRSAKeys error",error)
        }
    }
}

// ----- rsa | end | -----

module.exports = {
    getRSAPrivateKey: getRSAPrivateKey,
    getRSAPublicKey: getRSAPublicKey,
    generateRSAKeys: generateRSAKeys,
    getRSAKeys: getRSAKeys
};