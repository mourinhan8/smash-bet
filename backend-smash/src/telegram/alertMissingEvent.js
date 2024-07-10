require("module-alias/register");
const botSendMessage = require("@telegram/botSendMessage");
const config = require("@config");
const getChainScan = require("@blockchain/provider/getChainScan");

const alertMissingEvent = async (item) => {
    try {
        const UrlScan = getChainScan(item.chainId);
        const message = `Missing Event from Smash-Shadown-Indexing module:
      + Event Name: ${item.event} 
      + ChainID: ${item.chainId} 
      + Transaction Hash: ${UrlScan}${item.txHash} 
     `;
        await botSendMessage({
            botToken: config.telegram.botToken,
            chatId: config.telegram.chatId,
            message: message,
        });

        return true;
    } catch (e) {
        return false;
    }
};

module.exports = alertMissingEvent;
