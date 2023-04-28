const nedb = require('nedb-promises');
const usersDB = new nedb({ filename: 'usersDB.db', autoload: true });
const uuid = require('uuid-random');

async function addUser(username, password) {

    const userId = uuid();
    const result = await usersDB.insert({ username: username, password: password, _id: userId });
    return result;
}

async function findUser(username) {

    const result = await usersDB.findOne({ username: username }, { username: 0 });
    return result;
}

async function compareUsers(username) {
    
    const result = await usersDB.findOne({ username: username });

    if(result) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = { addUser, findUser, compareUsers }