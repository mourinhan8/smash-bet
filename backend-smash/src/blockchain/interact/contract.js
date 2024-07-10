require("module-alias/register");
require("dotenv").config();
const ethers = require("ethers");
const getProvider = require("@blockchain/provider/getProvider");
const logger = require("@logger");
const config = require("@config");
const getAbiContract = require("@mysql/crud/getAbiContract");

const contract = {
    callWithdrawMultiple: async (chainId, tokenAddress, amounts, wallets) => {
        try {
            logger.info(
                `received request withdraw with chainId=${chainId}, tokenAddress=${tokenAddress}, amounts=${amounts}, wallets=${wallets}`
            );
            const provider = await getProvider(chainId);
            //get admin signer
            const signer = new ethers.Wallet(config.blockchain.adminKey, provider);
            const contractName = `SuperSmashBros`;
            const { contractAddress, contractAbi } = await getAbiContract(chainId, contractName);
            const CONTRACT = new ethers.Contract(contractAddress, contractAbi, provider);
            const CONTRACT_SIGNER = CONTRACT.connect(signer);
            let amountsConvert = [];
            for (let index = 0; index < amounts.length; index++) {
                amountsConvert.push(ethers.utils.parseUnits(amounts[index] + "", 6));
            }
            const createTx = await CONTRACT_SIGNER.WithdrawBulkTokensToWallets(tokenAddress, amountsConvert, wallets);
            return createTx?.hash || null;
        } catch (error) {
            logger.warn(`callWithdrawMultiple got exception: ${error}`);
            return null;
        }
    },
};

module.exports = contract;
