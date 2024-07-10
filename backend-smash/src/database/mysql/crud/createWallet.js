require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const dayjs = require("dayjs");

const createWallet = async (userId, trans) => {
    try {
        const checkWallet = await models.wallets.findOne({
            where: {
                userId: userId,
            },
        });
        if (checkWallet != null) {
            return false;
        } else {
            await models.wallets.create(
                {
                    userId: userId,
                    tokenId: 1,
                    balance: 0,
                    createdAt: +dayjs(),
                },
                {
                    transaction: trans,
                }
            );
            return true;
        }
    } catch (exception) {
        logger.warn("createWallet got exception:" + exception);
        return false;
    }
};

module.exports = createWallet;
