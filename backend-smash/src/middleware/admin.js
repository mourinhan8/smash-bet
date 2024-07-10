const verifySecret = () => async (req, res, next) => {
    const { secret } = req.body;
    if (secret === process.env.SECRET_ADMIN && secret != null) {
        next();
    } else {
        return res.status(400).json({
            code: "NOK",
            data: { message: "Secret Required" },
        });
    }
};

module.exports = { verifySecret };
