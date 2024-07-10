require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getAbiContract = async (chainId, contractName) => {
    try {
        const detailContract = await models.contracts.findOne({
            where: {
                chainId: chainId,
                contractName: contractName,
            },
            attributes: ["contractAddress", "contractAbi"],
        });
        if (detailContract) {
            return {
                contractAddress: detailContract.contractAddress,
                contractAbi: detailContract.contractAbi,
            };
        } else {
            logger.warn(`getAbiContract cannot find any contract as request`);
            return {
                contractAddress: null,
                contractAbi: null,
            };
        }
    } catch (exception) {
        logger.warn("getAbiContract got exception:" + exception);
        return {
            contractAddress: null,
            contractAbi: null,
        };
    }
};
module.exports = getAbiContract;
