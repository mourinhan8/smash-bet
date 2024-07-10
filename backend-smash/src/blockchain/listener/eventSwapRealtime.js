require("module-alias/register");
const ethers = require("ethers");
const getProvider = require("@blockchain/provider/getProvider");
const decodeEvents = require("@blockchain/decode/decodeEvents");
const indexingEventQueue = require("@queue/indexing/indexingEvent.queue");
const logger = require("@logger");
const getAbiContract = require("@mysql/crud/getAbiContract");

eventSwapRealtime = async (chainId) => {
    try {
        const contractName = `SuperSmashBros`;
        const { contractAddress, contractAbi } = await getAbiContract(chainId, contractName);
        logger.info(`eventSwapRealtime is running with contract=${contractAddress}...`);
        if (contractAddress !== null && contractAbi !== null) {
            const provider = await getProvider(chainId);
            const contract = new ethers.Contract(contractAddress, contractAbi, provider);
            const jobOptions = {
                removeOnComplete: true,
                attempts: 2,
            };
            await contract.on("*", async (item) => {
                const eventDetail = await decodeEvents(item, "realtime", chainId, provider);
                //send event to the queue
                await indexingEventQueue.add(
                    {
                        eventDetail,
                    },
                    jobOptions
                );
            });
        }
    } catch (error) {
        logger.warn("eventSwapRealtime got exception:", error);
    }
};
module.exports = eventSwapRealtime;
