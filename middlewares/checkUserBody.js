
const { compareUsers } = require('./../model/user');

function checkNewUser(req, res, next) {
    
    const { username, password } = req.body;

    const minUsernameLength = 4;
    const minPasswordLength = 8;
    const maxUsernameLength = 30;
    const maxPasswordLength = 50;

    if( !("username" in req.body || !("password" in req.body))) {
        res.status(400).json({
            success: false,
            message: "Error! 'username' och/eller 'password' saknas"
        });
    }
    else if( !(typeof(username) === "string") || !(typeof(password) === "string")) {
        res.status(400).json({
            success: false,
            message: "Error! 'username' och 'password' måste innehålla strängar"
        });
    }
    else if(username.length < minUsernameLength ||
            username.length > maxUsernameLength ||
            password.length < minPasswordLength ||
            password.length > maxPasswordLength) 
            {
                res.status(400).json({
                    success: false,
                    message: `Error! Innehållet i 'username' måste vara mellan ${minUsernameLength} - ${maxUsernameLength} tecken, 'password' måste vara mellan ${minPasswordLength} - ${maxUsernameLength} tecken`
                });
    }
    else {
        next();
    }
}

async function checkDuplicateUsers(req, res, next) {
    
    const { username } = req.body;
    const result = await compareUsers(username);

    if(result) {
        res.status(418).json({
            success: false,
            message: "Användarnamnet används redan"
        });
    }
    else {
        next();
    }
}

function checkLogin(req, res, next) {

    const { username, password } = req.body;

    if( !(typeof(username) === "string") || !(typeof(password) === "string")) {
        res.status(400).json({
            success: false,
            message: "Error! 'username' och 'password' måste innehålla strängar"
        });
    }
    else {
        next();
    }
    
}

module.exports = { checkNewUser, checkDuplicateUsers, checkLogin }