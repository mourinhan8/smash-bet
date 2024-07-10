require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getWinAddressesWithAmounts = async (gameId, winnerId) => {
    try {
        console.log(`getWinAddressesWithAmounts with gameId=${gameId} && winnerId=${winnerId}`);
        const winners = await models.betHistory.findAll({
            where: {
                gameId: +gameId,
                characterId: +winnerId,
            },
            attributes: ["userId", "walletId", "amount"],
            include: [
                {
                    as: "user",
                    model: models.users,
                    attributes: ["walletAddress"],
                },
            ],
            order: [["id", "DESC"]],
        });
        let addresses = [],
            amounts = [];
        for (let index = 0; index < winners.length; index++) {
            const winner = winners[index];
            addresses.push(winner.user.walletAddress);
            amounts.push(winner.amount);
        }
        return {
            addresses,
            amounts,
        };
    } catch (exception) {
        logger.warn("getWinAddressesWithAmounts got exception:" + exception);
        return [];
    }
};
module.exports = getWinAddressesWithAmounts;
