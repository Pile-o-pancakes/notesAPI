const nedb = require('nedb-promises');
const notesDB = new nedb({ filename: 'notesDB.db', timestampData: true, autoload: true });

async function getAllNotes() {
    const result = await notesDB.find();
    return result;
}

async function addNewNote(title, text, id) {
    
    try {
        await notesDB.insert({ title: title, text: text, _id: id });
        return true;
    }
    catch {
        return false;
    }
}

async function findNote(searchTerm) {
    const titleResult = await notesDB.find({ title: /searchTerm/ }) //TODO: ordna så det går att söka med en variabel
    console.log(titleResult);
}

async function editNote() {

}

module.exports = { getAllNotes, addNewNote, findNote, editNote }