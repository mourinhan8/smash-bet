require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const dayjs = require("dayjs");
const bcrypt = require("bcryptjs");
const speakeasy = require("speakeasy");
const cryptr = require("@lib/cryptrUtils");

const createAdmin = async (email, password) => {
    try {
        const checkAdminExisted = await models.admin.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (checkAdminExisted) {
            logger.warn("Email existed");
            return "existed";
        } else {
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            const secret = speakeasy.generateSecret({
                name: `admin ${email}`,
            });
            const newAdmin = await models.admin.create({
                email: email.toLowerCase(),
                password: passwordHashed,
                googleSecretAscii: secret.ascii,
                googleSecret: cryptr.encrypt(JSON.stringify(secret)),
                createdAt: +dayjs(),
            });
            return newAdmin;
        }
    } catch (exception) {
        logger.warn("createAdmin got exception:" + exception);
        return null;
    }
};

module.exports = createAdmin;
