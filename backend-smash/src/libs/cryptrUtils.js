require("module-alias/register");
const Cryptr = require("cryptr");
const config = require("@config");

const cryptr = new Cryptr(config.crypto.encryptKey, { saltLength: 10 });

module.exports = cryptr;
