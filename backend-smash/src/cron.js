require("module-alias/register");
var CronJob = require("cron").CronJob;
const crawlEventHistoryETH = require("@cron/crawlEventHistoryETH");
const checkAndStartGame = require("@cron/checkAndStartGame");
const processWithdrawRequest = require("@cron/processWithdrawRequest");
const logger = require("@logger");

async function runCronJobs() {
    const cronCrawlEventHistoryETH = new CronJob("*/2 * * * *", crawlEventHistoryETH); //every 2 mins
    const cronCheckAndStartGame = new CronJob("*/20 * * * * *", checkAndStartGame); //every 20s
    const cronProcessWithdrawRequest = new CronJob("30 * * * * *", processWithdrawRequest); //every min at 30''
    
    cronCrawlEventHistoryETH.start();
    logger.info(`cronCrawlEventHistoryETH has started...`);
    cronCheckAndStartGame.start();
    logger.info(`cronCheckAndStartGame has started...`);
    cronProcessWithdrawRequest.start();
    logger.info(`cronProcessWithdrawRequest has started...`);    
    
}

runCronJobs();
