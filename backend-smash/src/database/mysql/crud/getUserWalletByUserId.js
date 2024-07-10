require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getUserWalletByUserId = async (userId) => {
    try {
        const userInfo = await models.users.findOne({
            where: {
                id: userId,
            },
            attributes: ["walletAddress"],
        });
        const userWallet = userInfo?.walletAddress || null;
        return userWallet;
    } catch (exception) {
        logger.warn("getUserWalletByUserId got exception:" + exception);
        return null;
    }
};

module.exports = getUserWalletByUserId;
