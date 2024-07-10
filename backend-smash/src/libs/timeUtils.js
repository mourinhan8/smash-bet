const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");

module.exports = {
    getTime: () => {
        //dayjs.extend(timezone);
        //dayjs.tz.setDefault('Asia/Bangkok');
        return dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    getDayId: () => {
        //dayjs.extend(timezone);
        //dayjs.tz.setDefault('Asia/Bangkok');
        return dayjs().format("YYYYMMDD");
    },
    getWeekId: () => {
        //dayjs.tz.setDefault('Asia/Bangkok');
        dayjs.extend(weekOfYear);
        return +`${dayjs().year()}${dayjs().week()}`;
    },
    getMonthId: () => {
        //dayjs.extend(timezone);
        //dayjs.tz.setDefault('Asia/Bangkok');
        return dayjs().format("YYYYMM");
    },
    getDiffMinutesFromNow: (_time) => {
        const timeCompare = dayjs(_time);
        const timeNow = dayjs();
        return timeNow.diff(timeCompare, "minutes", true);
    },
};
