require("module-alias/register");
const ethers = require("ethers");
const getProvider = require("@blockchain/provider/getProvider");
const decodeEvents = require("@blockchain/decode/decodeEvents");
const indexingEventQueue = require("@queue/indexing/indexingEvent.queue");
const logger = require("@logger");
const getChainSupport = require("@blockchain/provider/getChainSupport");

investigateSwapEvents = async (contractAddress, ABI, eventName, chainId) => {
    try {
        const provider = await getProvider(chainId);
        const blockLastest = await provider.getBlockNumber();
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        const offsetBlock = +getChainSupport.getBlockOffsetOfChain(chainId);
        const from_block = blockLastest - 3 - offsetBlock;
        const to_block = blockLastest - 3;
        const jobOptions = {
            removeOnComplete: true,
            attempts: 3,
        };
        let events = await contract.queryFilter(eventName, from_block, to_block);
        await Promise.all(
            events.map(async (item) => {
                logger.info(item);
                const eventDetail = await decodeEvents(item, "history", chainId, provider);
                await indexingEventQueue.add(
                    {
                        eventDetail,
                    },
                    jobOptions
                );
            })
        );
    } catch (error) {
        logger.warn(error);
    }
};

module.exports = investigateSwapEvents;
