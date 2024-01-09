const jwt = require('jsonwebtoken');

exports.userAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                console.log("Decoded Token : ", decodedToken);
                if (decodedToken.role != "user") {
                    return res.status(401).json({ message: "Not authorized" })
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

exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.secret, (err, decodedToken) => {
            if (err || decodedToken.role !== "admin") {
                return res.status(401).json({ message: "Not authorized - only admin can perform this action" })
            } else {
                next();
            }
        });
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
};


