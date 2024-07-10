require("module-alias/register");
const logger = require("@logger");
const { models, sequelize } = require("@mysql/index");
const dayjs = require("dayjs");
const alertMissingEvent = require("@telegram/alertMissingEvent");
const getTransactionByHash = require("@mysql/crud/getTransactionByHash");

const SuperSmashOnchainService = async (item) => {
    try {
        let result = false;
        const isSaveBefore = await getTransactionByHash(item.txHash);
        if (!isSaveBefore) {
            //check if missing old event so send message to bot
            if (item.source === "history") {
                await alertMissingEvent(item);
            }
            //validate params
            const [checkToken, checkUser] = await Promise.all([
                models.tokens.findOne({
                    where: {
                        chainId: item.chainId,
                        address: item.tokenAddress,
                    },
                }),
                models.users.findOne({
                    where: {
                        walletAddress: item.userWallet,
                    },
                }),
            ]);

            let checkWallet = null;

            if (checkToken?.id && checkUser?.id) {
                checkWallet = await models.wallets.findOne({
                    where: {
                        userId: checkUser?.id,
                        tokenId: checkToken?.id,
                    },
                });
            }

            if (checkToken?.id && checkUser?.id && checkWallet?.id) {
                await sequelize.transaction(async (trans) => {
                    checkWallet.balance += +item.amountTokenConverted;
                    checkWallet.updatedAt = +dayjs();
                    await Promise.all([
                        models.transactions.create({
                            userId: checkUser?.id,
                            walletId: checkWallet?.id,
                            tokenId: checkToken?.id,
                            type: "deposit",
                            message: "deposit onchain",
                            value: +item.amountTokenConverted,
                            fee: 0,
                            txHash: item.txHash,
                            preBalance: +checkWallet?.balance,
                            postBalance: +checkWallet?.balance + +item.amountTokenConverted,
                            createdAt: +dayjs(),
                        }),
                        checkWallet.save(),
                    ]);
                    trans.afterCommit(() => {
                        logger.info(`SuperSmashOnchainService: save deposit action:${JSON.stringify(item)} success!`);
                    });
                });
                result = true;
            } else {
                logger.warn(
                    `SuperSmashOnchainService: cannot find the valid info to save deposit event: ${JSON.stringify(
                        item,
                        null,
                        4
                    )}`
                );
            }
        } else {
            logger.warn("Event saved before! No need to do anything!!!");
            result = false;
        }
        return result;
    } catch (exception) {
        logger.warn("SuperSmashOnchainService exception:" + exception);
    }
};

module.exports = SuperSmashOnchainService;
