require("module-alias/register");
const config = require("@config");
const eventSwapHistoryCustom = require("@blockchain/listener/eventSwapHistoryCustom");

async function runScanFromJumperBlock() {
    await eventSwapHistoryCustom(config.blockchain.chainId.ethereum);
}

runScanFromJumperBlock();
