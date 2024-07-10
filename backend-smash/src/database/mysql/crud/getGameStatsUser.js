require("module-alias/register");
const { models } = require("@mysql/index");
const logger = require("@logger");

const getGameStatsUser = async (userId) => {
    try {
        const [betHistory, userTransactions] = await Promise.all([
            models.betHistory.findAll({
                where: {
                    userId: userId,
                },
                include: [
                    {
                        as: "game",
                        model: models.games,
                        attributes: ["id", "winnerId", "status"],
                    },
                ],
            }),
            models.transactions.findAll({
                where: {
                    userId: userId,
                },
            }),
        ]);
        let totalWon = 0,
            totalLost = 0,
            totalDeposit = 0,
            totalWithdraw = 0,
            totalBetAmount = 0,
            totalCashout = 0,
            totalRefund = 0; //cashout mearn reward
        for (let index = 0; index < betHistory.length; index++) {
            const betRecord = betHistory[index];
            if (betRecord.game.status == "ending") {
                if (betRecord.characterId == betRecord.game.winnerId) {
                    totalWon += 1;
                } else {
                    totalLost += 1;
                }
            }
        }

        for (let index = 0; index < userTransactions.length; index++) {
            const tx = userTransactions[index];
            switch (tx.type) {
                case "deposit":
                    totalDeposit += +tx.value;
                    break;
                case "bet":
                    totalBetAmount += +tx.value;
                    break;
                case "reward":
                    totalCashout += +tx.value;
                    break;
                case "withdraw":
                    totalWithdraw += +tx.value;
                    break;
                case "refund":
                    totalRefund += +tx.value;
                    break;
                default:
                    break;
            }
        }
        return {
            totalBet: betHistory.length,
            totalWon,
            totalLost,
            totalDeposit,
            totalWithdraw,
            totalBetAmount,
            totalCashout,
            totalRefund,
        };
    } catch (exception) {
        logger.warn("getGameStatsUser got exception:" + exception);
        return [];
    }
};

module.exports = getGameStatsUser;
