
const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const data = jwt.verify(token, "Pannkaka");

        if(data) {
            next();
        }
    }
    catch {
        res.json({
            success: false,
            message: "Error! Ogiltig token"
        })
    }
}

module.exports = { verifyToken }