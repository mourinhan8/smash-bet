require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getAdminByEmail = async (email) => {
    try {
        const adminInfo = await models.admin.findOne({
            where: {
                email: email.toLowerCase(),
            },
            attributes: ["id", "password", "googleAuthen", "googleSecret"],
        });
        if (adminInfo) {
            return {
                id: adminInfo.id,
                email,
                password: adminInfo.password,
                isGoogleAuthen: adminInfo.googleAuthen,
                googleSecret: adminInfo.googleSecret,
            };
        } else {
            logger.warn(`getAdminById got exception: email=${email} are wrong`);
            return null;
        }
    } catch (exception) {
        logger.warn("getAdminByEmail got exception:" + exception);
        return null;
    }
};

const getAdminById = async (id) => {
    try {
        const adminInfo = await models.admin.findOne({
            where: {
                id: id,
            },
            attributes: ["id", "email"],
        });
        if (adminInfo) {
            return {
                id: adminInfo.id,
                email: adminInfo.email,
            };
        } else {
            logger.warn(`getAdminById got exception: userId=${id} are wrong`);
            return null;
        }
    } catch (exception) {
        logger.warn("getAdminById got exception:" + exception);
        return null;
    }
};

const getGoogleAuthen = async (id) => {
    try {
        const googleAuthen = await models.admin.findOne({
            where: {
                id: id,
            },
            attributes: ["googleAuthen", "googleSecretAscii"],
        });
        if (googleAuthen) {
            return {
                isGoogleAuthen: googleAuthen.googleAuthen,
                googleSecretAscii: googleAuthen.googleSecretAscii,
            };
        } else {
            logger.warn(`getGoogleAuthen got exception: userId=${id} are wrong`);
            return null;
        }
    } catch (exception) {
        logger.warn("getGoogleAuthen got exception:" + exception);
        return null;
    }
};

exports.getAdminByEmail = getAdminByEmail;
exports.getAdminById = getAdminById;
exports.getGoogleAuthen = getGoogleAuthen;
