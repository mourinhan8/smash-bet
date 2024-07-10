require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const dayjs = require("dayjs");

const updateCharacter = async (characterId, newFormer) => {
    try {
        const character = await models.characters.findOne({
            where: {
                id: +characterId,
            },
        });
        console.log(newFormer);
        if (character) {
            character.former = newFormer;
            character.updatedAt = +dayjs();
            const saveInfo = await character.save();
            return saveInfo;
        } else {
            return null;
        }
    } catch (exception) {
        logger.warn("updateCharacter got exception:" + exception);
        return [];
    }
};

module.exports = updateCharacter;
