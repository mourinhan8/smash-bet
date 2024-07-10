require("module-alias/register");
const logger = require("@logger");
const config = require("@config");
const contract = require("@blockchain/interact/contract");
const updateResultProcessWithdrawRequest = require("@mysql/crud/updateResultProcessWithdrawRequest");

const withdrawProcess = async (data) => {
    try {
        if (data.request !== undefined) {
            logger.info(JSON.stringify(data.request, null, 4));
            const { tokenAddress, amounts, wallets, ids } = data.request;
            const makeWithdrawHash = await contract.callWithdrawMultiple(
                config.blockchain.chainId.bsc,
                tokenAddress,
                amounts,
                wallets
            );
            if (makeWithdrawHash) {
                //withdraw success
                await updateResultProcessWithdrawRequest(ids, makeWithdrawHash, "success");
                return;
            } else {
                //withdraw fail
                logger.warn("withdraw.process has failed.");
                await updateResultProcessWithdrawRequest(ids, null, "fail");
                return;
            }
        } else {
            logger.warn("withdraw.process got undefined data! Something wrong happened!");
            return;
        }
    } catch (error) {
        logger.warn("withdraw.process exception: " + error);
        return;
    }
};

module.exports = withdrawProcess;
