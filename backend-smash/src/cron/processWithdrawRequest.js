require("module-alias/register");
const logger = require("@logger");
const getPendingWithdrawRequests = require("@mysql/crud/getPendingWithdrawRequests");
const withdrawQueue = require("@queue/withdraw/withdraw.queue");
const getUserWalletByUserId = require("@mysql/crud/getUserWalletByUserId");
const getTokenAddressByTokenId = require("@mysql/crud/getTokenAddressByTokenId");
const updateResultProcessWithdrawRequest = require("@mysql/crud/updateResultProcessWithdrawRequest");

const processWithdrawRequest = async () => {
    try {
        const neededProcessingRequests = await getPendingWithdrawRequests();
        if (!neededProcessingRequests || neededProcessingRequests.length == 0) {
            logger.info(`Noone want to withdraw. Nothing to do, relax...`);
            return true;
        } else {
            let wallets = [],
                ids = [],
                amounts = [];
            for (let index = 0; index < neededProcessingRequests.length; index++) {
                const thisRequest = neededProcessingRequests[index];
                const receiverWallet = await getUserWalletByUserId(+thisRequest.userId);
                if (receiverWallet) {
                    ids.push(+thisRequest.id);
                    wallets.push(receiverWallet);
                    amounts.push(+thisRequest.amount);
                }
            }
            const tokenAddress = await getTokenAddressByTokenId(+neededProcessingRequests[0].tokenId);
            if (tokenAddress != null) {
                const jobOptions = {
                    removeOnComplete: true,
                    attempts: 1,
                };
                const request = {
                    tokenAddress: tokenAddress,
                    amounts: amounts,
                    wallets: wallets,
                    ids: ids,
                };
                await updateResultProcessWithdrawRequest(ids, null, "executing");
                await withdrawQueue.add(
                    {
                        request,
                    },
                    jobOptions
                );
            }
            return true;
        }
    } catch (error) {
        logger.warn(`processWithdrawRequest got exception: ${error}`);
    }
};

module.exports = processWithdrawRequest;
