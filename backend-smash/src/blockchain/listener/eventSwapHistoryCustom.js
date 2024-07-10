require("module-alias/register");
const investigateSwapEventsCustom = require("@blockchain/investigate/investigateSwapEventsCustom");
const SMCEvents = require("@blockchain/constant/SMCEvents");
const config = require("@config");
const logger = require("@logger");
const getAbiContract = require("@mysql/crud/getAbiContract");
const getChainSupport = require("@blockchain/provider/getChainSupport");
const getProvider = require("@blockchain/provider/getProvider");

eventSwapHistoryCustom = async (chainId) => {
    try {
        const contractName = `SuperSmashBros`;
        const { contractAddress, contractAbi } = await getAbiContract(chainId, contractName);
        logger.info(`eventSwapHistoryCustom is running with contract=${contractAddress}...`);
        if (contractAddress !== null && contractAbi !== null) {
            const provider = await getProvider(chainId);
            let blockLastest = await provider.getBlockNumber();
            const JumperFromBlock = +config.blockchain.jumperBlock;
            if (JumperFromBlock <= 0 || JumperFromBlock >= blockLastest) {
                logger.warn("eventSwapHistoryCustom cannot jumper from block <= 0 or block >= current");
                return;
            } else {
                const offsetBlock = getChainSupport.getBlockOffsetOfChain(chainId);
                let fromBlock = JumperFromBlock;
                let toBlock = JumperFromBlock + offsetBlock;
                while (toBlock < blockLastest + offsetBlock) {
                    logger.info(`fromBlock=${fromBlock} and toBlock=${toBlock} scanning...`);
                    if (toBlock > blockLastest) toBlock = blockLastest;
                    for (let eventName in SMCEvents) {
                        await investigateSwapEventsCustom(
                            contractAddress,
                            contractAbi,
                            eventName,
                            chainId,
                            fromBlock,
                            toBlock
                        );
                    }
                    //setTimeout(function () {}, 1000);
                    fromBlock = toBlock;
                    toBlock = toBlock + offsetBlock;
                }
            }
        } else {
            logger.info("eventSwapHistoryCustom failed when getting contract and contractAbi...");
        }
    } catch (error) {
        logger.warn("eventSwapHistoryCustom got exception:", error);
    }
};
module.exports = eventSwapHistoryCustom;
