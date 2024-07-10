require("module-alias/register");
const logger = require("@logger");
const getMessage = require("@mysql/crud/getMessage");

const messageController = {
    getMessage: async (req, res) => {
        try {
            const urlParams = new URLSearchParams(req.query);
            const pageSize = urlParams.get("pageSize");
            const page = urlParams.get("page");
            const messages = await getMessage(pageSize, page);

            return res.status(200).json({
                code: "OK",
                data: messages,
            });
        } catch (exception) {
            logger.warn(`messageController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
};

module.exports = messageController;
