require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getUser = async (wallet) => {
    try {
        const userInfo = await models.users.findOne({
            where: {
                walletAddress: wallet,
            },
            attributes: ["id", "walletAddress", "referralCode"],
            include: [
                {
                    as: "wallets",
                    model: models.wallets,
                    attributes: ["id", "balance"],
                },
            ],
        });
        return {
            id: userInfo?.id || null,
            walletAddress: userInfo?.walletAddress || null,
            referralCode: +userInfo?.referralCode || null,
            balance: +userInfo?.wallets[0]?.balance || 0,
        };
    } catch (exception) {
        logger.warn("getUser got exception:" + exception);
        return null;
    }
};

module.exports = getUser;
