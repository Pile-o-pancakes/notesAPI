const { Router } = require('express');
const router = Router();

const { addUser, findUser } = require('./../model/user');
const { checkNewUser, checkDuplicateUsers, checkLogin } = require('../middlewares/checkUserBody');
const { hashPassword, comparePasswords } = require('./../bcrypt');
const jwt = require('jsonwebtoken');

router.post("/login", checkLogin, async (req, res) => {

    const { username, password } = req.body;
    const userFound = await findUser(username);
    let correctPassword = false;

    try {
        correctPassword = await comparePasswords(password, userFound.password);
    }
    catch {
        console.log("Det finns inget särskilt att göra här. Behöver bara se till att comparePassword inte kraschar :)");
    }

    if(correctPassword) {
        const token = jwt.sign({ id: userFound._id}, 'Pannkaka', {
            expiresIn: 3000
        });
        res.status(200).json({
            success: true,
            token: token
        });
    }
    else {
        res.status(418).json({
            success: false,
            message: "Användarnamn eller lösenord är fel"
        });
    }
});

router.post("/signup", checkNewUser, checkDuplicateUsers, async (req, res) => {

    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const result = await addUser(username, hashedPassword);

    if(result) {
        res.status(200).json({
            success: true,
            message: "Kontot har skapats"
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
});

module.exports = router