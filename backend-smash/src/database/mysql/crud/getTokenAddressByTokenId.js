require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getTokenAddressByTokenId = async (tokenId) => {
    try {
        const userInfo = await models.tokens.findOne({
            where: {
                id: tokenId,
            },
            attributes: ["address"],
        });
        return userInfo?.address || null;
    } catch (exception) {
        logger.warn("getTokenAddressByTokenId got exception:" + exception);
        return null;
    }
};

module.exports = getTokenAddressByTokenId;
