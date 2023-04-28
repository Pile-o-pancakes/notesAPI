const nedb = require('nedb-promises');
const notesDB = new nedb({ filename: 'notesDB.db', timestampData: true, autoload: true });

async function getAllNotes() {

    const result = await notesDB.find({}).sort({ updatedAt: -1 });
    return result;
}

async function findNoteById(id) {

    const result = await notesDB.findOne({ _id: id }, { _id: 0 });
    return result;
}

async function findNotesByTitle(searchTerm) {

    // const result = await notesDB.find({ title: /searchTerm/ }); //Sök med en variabel, om jag kan komma på rätt syntax
    const result = await notesDB.find({ title: searchTerm });
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

async function editNote(oldId, newNote) {

    const { title, text } = newNote;
    try {
        const result = await notesDB.update({ _id: oldId }, { $set: { title: title, text: text }});
        return result;
    }
    catch {
        return false;
    }
    
}

async function deleteNote(id) {
    const result = await notesDB.remove({ _id: id });
    return result;
}

module.exports = { getAllNotes, addNewNote, findNotesByTitle, findNoteById, editNote, deleteNote }