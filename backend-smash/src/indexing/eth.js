require("module-alias/register");
require("dotenv").config();
const eventSwapRealtime = require("@blockchain/listener/eventSwapRealtime");
const config = require("@config");
const { mySqlConnect } = require("@mysql/index");
const logger = require("@logger");

const indexing = async () => {
    await mySqlConnect();
    await eventSwapRealtime(config.blockchain.chainId.ethereum);
    logger.info(
        `Initialization process completed successfully! Now listening for swap events on the Ethereum Mainnet....`
    );
};

indexing();
