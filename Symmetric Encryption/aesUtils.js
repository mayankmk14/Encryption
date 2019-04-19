const crypto = require("crypto")

var generateAES = async function () {
    try {
        var password = "Village hidden in the Leaf"
        salt = await crypto.randomBytes(32)
        console.log("Salt", salt)
        //Using PBKDF2-HMAC-SHA512 with 100,000 iterations, create a key using the password and the salt.
        derivedKey = await crypto.pbkdf2Sync(password, salt, 10, 32, "sha512")
        var aes256Key = new Buffer(derivedKey).toString('hex');
        return aes256Key;
    } catch (err) {
        console.log("ERROR", err)
        return err
    }
}

var encrypt = async function (aesKey, plainString) {
try {
    if (typeof (plainString) != "string") {
        throw new Error("plain string is not character string")
    };
    let iv = crypto.randomBytes(12);
    let cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(aesKey, 'hex'), iv);
    let encrypted = cipher.update(plainString);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    var tag = cipher.getAuthTag();
    var encryptedData = Buffer.concat([iv, tag, encrypted]).toString('hex')
    console.log("0Data ",plainString)
    console.log("Encrypted Data ",encryptedData)
    return encryptedData
} catch (err) {
    console.log("Error",err)
    return error;
}
};


var decrypt = async function (aesKey, encryptedString) {
    try {
        // hex decoding
        var bData = new Buffer(encryptedString, 'hex');
        // convert data to buffers
        var iv = bData.slice(0, 12);
        var text = bData.slice(28);
        let encryptedText = Buffer.from(text, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(aesKey, 'hex'), iv);
        var tag = bData.slice(12, 28);
        decipher.setAuthTag(tag);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        var decryptedData = decrypted.toString()
        return (decryptedData);
    } catch (error) {
        return (error);
    }
}


var some = async () => {
    console.log("sdsd")
    let aes = await generateAES()
    encpt = await encrypt(aes,"My name is Mayank")
    console.log("Encrypt",encpt)
    console.log(await decrypt(aes,encpt))
};

some();


module.exports = {
    generateAES,
    encrypt,
    decrypt
}

