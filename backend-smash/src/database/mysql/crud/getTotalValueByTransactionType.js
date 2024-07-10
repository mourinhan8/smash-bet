require("module-alias/register");
const logger = require("@logger");
const { models, sequelize } = require("@mysql/index");

const getTotalValueByTransactionType = async (userId, type) => {
    try {
        let whereFilter = {};
        if (+userId > 0) {
            whereFilter = {
                ...whereFilter,
                userId: userId,
            };
        }
        if (type != null) {
            whereFilter = {
                ...whereFilter,
                type: type,
            };
        }
        const sumValue = await models.transactions.findAll({
            where: whereFilter,
            attributes: [[sequelize.fn("SUM", sequelize.col("value")), "totalValue"]],
        });
        return sumValue[0]?.dataValues.totalValue || 0;
    } catch (exception) {
        console.log(exception);
        logger.warn("getUserTotalValue by Transaction got exception:" + exception);
        return -1;
    }
};

module.exports = getTotalValueByTransactionType;
