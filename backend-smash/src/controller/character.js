require("module-alias/register");
const logger = require("@logger");
const getCharacters = require("@mysql/crud/getCharacters");
const updateCharacter = require("@mysql/crud/updateCharacter");

const characterController = {
    getAllCharacters: async (req, res) => {
        try {
            const stats = await getCharacters();
            return res.status(200).json({
                code: "OK",
                data: stats,
            });
        } catch (exception) {
            logger.warn(`characterController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },

    updateCharacterInfo: async (req, res) => {
        try {
            const urlBody = req.body;
            const characterId = urlBody.characterId;
            const formerName = urlBody.former;
            const updated = await updateCharacter(+characterId, formerName);
            if (updated) {
                return res.status(200).json({
                    code: "OK",
                    data: "success",
                });
            } else {
                return res.status(400).json({
                    code: "NOK",
                    data: "the characterId is not existed",
                });
            }
        } catch (exception) {
            logger.warn(`characterController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
};
module.exports = characterController;
