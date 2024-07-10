require("module-alias/register");
const ethers = require("ethers");
const getProvider = require("@blockchain/provider/getProvider");
const decodeEvents = require("@blockchain/decode/decodeEvents");
const indexingEventQueue = require("@queue/indexing/indexingEvent.queue");
const logger = require("@logger");

investigateSwapEventsCustom = async (contractAddress, ABI, eventName, chainId, fromBlock, toBlock) => {
    try {
        logger.info(
            `investigateSwapEventsCustom: contractAddress=${contractAddress} eventName=${eventName} chainId=${chainId} fromBlock=${fromBlock} toBlock=${toBlock}`
        );
        const provider = await getProvider(chainId);
        const blockLastest = await provider.getBlockNumber();
        if (fromBlock > blockLastest) return;
        let fromBlockFinal = fromBlock;
        let toBlockFinal = toBlock;
        if (toBlock > blockLastest) toBlockFinal = blockLastest;
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        const jobOptions = {
            removeOnComplete: true,
            attempts: 3,
        };
        let events = await contract.queryFilter(eventName, fromBlockFinal, toBlockFinal);
        await Promise.all(
            events.map(async (item) => {
                //send event to the queue
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

module.exports = investigateSwapEventsCustom;
