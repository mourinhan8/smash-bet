const jwt = require("jsonwebtoken");
const ethers = require("ethers");
const logger = require("@logger");

function getSignMessage(address, nonce) {
    return `Verification for address ${address}:\n\n${nonce}`;
}

const auth = {
    nonce: (req, res) => {
        const nonce = new Date().getTime();
        const address = req.query.address;

        const tempToken = jwt.sign({ nonce, address }, process.env.PRIVATE_KEY, {
            expiresIn: "60s",
        });
        const message = getSignMessage(address, nonce);

        res.json({ tempToken, message });
    },
    verify: async (req, res) => {
        try {
            const authHeader = req.headers["authorization"];
            const tempToken = authHeader && authHeader.split(" ")[1];

            if (tempToken === null) return res.sendStatus(403);

            const userData = await jwt.verify(tempToken, process.env.PRIVATE_KEY);
            const nonce = userData.nonce;
            const address = userData.address;
            const signature = req.query.signature;
            const message = getSignMessage(address, nonce);

            const verifiedAddress = await ethers.utils.verifyMessage(message, signature);

            if (verifiedAddress.toLowerCase() === address.toLowerCase()) {
                const token = jwt.sign({ verifiedAddress: verifiedAddress.toLowerCase() }, process.env.PRIVATE_KEY, {
                    expiresIn: "1d",
                });
                return res.json({ token });
            } else {
                return res.sendStatus(403);
            }
        } catch (exception) {
            logger.warn(`authController got exception:${exception}`);
            return res.status(500).json({
                code: "NOK",
                data: {
                    message: String(exception),
                },
            });
        }
    },
    secret: async (req, res) => {
        res.send(`Welcome address ${req.authData.verifiedAddress}`);
    },
};

module.exports = auth;
