const jwt = require("jsonwebtoken");
const { getAdminById } = require("@mysql/crud/getAdmin");
const getUser = require("@mysql/crud/getUser");

const authenticate = (isRequiredUser) => async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")?.[1];

    if (!token && !isRequiredUser) {
        next();
        return;
    }

    console.log(token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.PRIVATE_KEY, async (err, authData) => {
        if (err) {
            console.log("err authen", err);
        }

        if (err?.name === "TokenExpiredError") {
            return res.status(401).json({ code: "NOK", data: { message: "Token is expired" } });
        } else {
            if (err && isRequiredUser) return res.sendStatus(403);
        }

        if (isRequiredUser) {
            const adminExisted = await getAdminById(authData["id"]);
            if (!adminExisted) return res.sendStatus(403);
        }

        req["authData"] = authData;

        next();
    });
};

const verifyToken = (isRequired) => async (req, res, next) => {
    const { verifyToken } = req.body;
    if (verifyToken == null) {
        return res.status(400).json({
            code: "NOK",
            data: {
                message: "Required 2fa token",
            },
        });
    }
    jwt.verify(verifyToken, process.env.PUBLIC_KEY, async (err, data) => {
        if (err) {
            console.log("2fa token err", err);
        }
        if (err?.name === "TokenExpiredError") {
            return res.status(400).json({ code: "NOK", data: { message: "2fa token is expired" } });
        } else {
            if (err && isRequired) return res.status(400).json({ code: "NOK", data: { message: "2fa token invalid" } });
        }
        if (isRequired) {
            const adminExisted = await getAdminById(data["id"]);
            if (!adminExisted) return res.status(400).json({ code: "NOK", data: { message: "admin not exist" } });
        }
        req["verifyData"] = data;
        next();
    });
};

const authenticateSocket = async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (token === null || token === undefined) {
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        const userData = await getUser(decoded["verifiedAddress"]);
        if (!userData?.id) {
            return next();
        }

        socket.authData = {
            ...decoded,
            userId: userData?.id,
        };
        next();
    } catch (err) {
        if (err?.name === "TokenExpiredError") {
            next();
        }

        next();
    }
};

module.exports = { authenticate, verifyToken, authenticateSocket };
