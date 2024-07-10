require("module-alias/register");
const logger = require("@logger");
const { models, sequelize } = require("@mysql/index");
const dayjs = require("dayjs");

const createUserAndWallet = async (wallet) => {
    try {
        const checkUserExisted = await models.users.findOne({
            where: {
                walletAddress: wallet,
            },
        });
        if (checkUserExisted) {
            return null;
        } else {
            await sequelize.transaction(async (trans) => {
                const newUser = await models.users.create(
                    {
                        walletAddress: wallet,
                        referralCode: Math.floor(100000 + Math.random() * 900000), //6 digits
                        createdAt: +dayjs(),
                    },
                    {
                        transaction: trans,
                    }
                );
                const checkWallet = await models.wallets.findOne({
                    where: {
                        userId: newUser?.id,
                    },
                });
                if (checkWallet == null) {
                    await models.wallets.create(
                        {
                            userId: newUser?.id,
                            tokenId: 1,
                            balance: 0,
                            createdAt: +dayjs(),
                        },
                        {
                            transaction: trans,
                        }
                    );
                }
                trans.afterCommit(() => {
                    logger.info(`createUserAndWallet success for wallet=${wallet}.`);
                });
            });

            return true;
        }
    } catch (exception) {
        logger.warn("createUserAndWallet got exception:" + exception);
        return false;
    }
};

module.exports = createUserAndWallet;
