const jwt = require('jsonwebtoken');

exports.userAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized 1" })
            } else {
                console.log("Decoded Token : ", decodedToken);
                if (decodedToken.role != "user") {
                    return res.status(401).json({ message: "Not authorized 2" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}


