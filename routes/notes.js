const { Router } = require('express');
const router = Router();
const uuid = require('uuid-random');

const { getAllNotes, addNewNote, findNotesByTitle, findNoteById, editNote, deleteNote } = require('./../model/notes');
const { checkNewNote, checkDeleteId } = require('../middlewares/checkNotesBody');

router.get("/", async (req, res) => {

    const result = await getAllNotes();
    if(result) {
        res.status(200).json({
            success: true,
            result: result
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
});

// router.get("/:id", async (req, res) => { //Överflödig route

//     const id = req.params.id;
//     const result = await findNoteById(id);
//     if(result) {
//         res.status(200).json({
//             success: true,
//             result: result
//         });
//     }
//     else {
//         res.status(404).json({
//             success: false,
//             message: "Inga matchande notes hittades"
//         });
//     }
// })

router.get("/search/:title", async (req, res) => {

    const title = req.params.title;
    const result = await findNotesByTitle(title);
    if(result) {
        res.status(200).json({
            success: true,
            result: result
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "Inga matchande notes hittades"
        });
    }
})

router.post("/", checkNewNote, async (req, res) => {

    const { title, text } = req.body;
    const id = uuid();
    const result = await addNewNote(title, text, id);
    
    if(result) {
        res.status(200).json({
            success: result,
            message: "Ny note tillagd",
            id: id
        });
    }
    else {
        res.status(500).json({
            success: result,
            message: "Internal server error"
        });
    }
});

router.put("/", checkNewNote, async (req, res) => {

    const { id } = req.body;
    const result = await editNote(id, req.body);

    if(result === 1) {
        res.status(200).json({
            success: true,
            message: `Note med id: ${id} har blivit redigerad`
        });
    }
    else if(result === 0) {
        res.status(404).json({
            success: false,
            message: "Ingen matchande note hittades"
        });
    }

});

router.delete("/", checkDeleteId, async (req, res) => {

    const id = req.body.id;
    const result = await deleteNote(id);

    if(result) {
        res.status(200).json({
            success: true,
            message: `Note med id: ${id} är borttagen`
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: "Ingen matchande note hittades"
        });
    }
});

module.exports = router