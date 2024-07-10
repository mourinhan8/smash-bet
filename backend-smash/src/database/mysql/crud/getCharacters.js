require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getCharacters = async () => {
    try {
        const characters = await models.characters.findAndCountAll({
            where: {},
            attributes: ["id", "name", "former", "image", "win", "lost", "updatedAt"],
            order: [["id", "ASC"]],
        });

        return characters;
    } catch (exception) {
        logger.warn("getCharacters got exception:" + exception);
        return [];
    }
};

module.exports = getCharacters;
