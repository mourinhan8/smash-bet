require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const speakeasy = require("speakeasy");

const updateGoogleAuthenSecret = async (id, email) => {
    try {
        const adminInfo = models.admin.findOne({
            where: {
                id,
            },
        });
        if (adminInfo) {
            const secret = speakeasy.generateSecret({
                name: `admin ${email}`,
            });
            adminInfo.googleSecretAscii = secret.ascii;
            adminInfo.googleSecret = cryptr.encrypt(JSON.stringify(secret));
            await adminInfo.save();
            return true;
        } else {
            logger.warn(`updateAdmin got exception: adminId=${id} is wrong`);
            return false;
        }
    } catch (error) {
        logger.warn("updateAdmin got exception: " + error);
        return false;
    }
};

const updateIsGoogleAuthen = async (id, value) => {
    try {
        const adminInfo = await models.admin.findOne({
            where: {
                id,
            },
        });
        if (adminInfo) {
            adminInfo.googleAuthen = value;
            await adminInfo.save();
            return true;
        } else {
            logger.warn(`updateAdminIsGoogleAuthen got exception: adminId=${id} is wrong`);
            return false;
        }
    } catch (error) {
        logger.warn("updateIsGoogleAuthen got exception: " + error);
        return false;
    }
};

exports.updateGoogleAuthenSecret = updateGoogleAuthenSecret;
exports.updateIsGoogleAuthen = updateIsGoogleAuthen;
