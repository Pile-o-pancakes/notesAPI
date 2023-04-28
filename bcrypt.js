const bcrypt = require('bcryptjs');

const hashRounds = 10;

async function hashPassword(password) {

    const hashedPassword = await bcrypt.hash(password, hashRounds);
    return hashedPassword;
}

async function comparePasswords(password, hashedPassword) {

    const result = bcrypt.compare(password, hashedPassword);
    return result;
}

module.exports = { hashPassword, comparePasswords }