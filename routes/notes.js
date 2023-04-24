const { Router } = require('express');
const router = Router();
const uuid = require('uuid-random');

const { getAllNotes, addNewNote, findNote, editNote } = require('./../model/notes');
const { checkNewNote } = require('./../middlewares/checkBody');

router.get("/", async (req, res) => {
    res.status(200).json(await getAllNotes());
});

router.get("/:id", async (req, res) => {
    findNote();
})

router.post("/", checkNewNote, async (req, res) => {
    const { title, text } = req.body;
    const id = uuid();
    const ifSuccess = await addNewNote(title, text, id);
    
    if(ifSuccess) {
        res.status(200).json({
            success: ifSuccess,
            message: "Ny note tillagd"
        })
    }
    else {
        res.status(500).json({
            success: ifSuccess,
            message: "Internal server error"
        })
    }
});

router.put("/", async (req, res) => {
    res.json(findNote(req.body));
    // TODO: lägg till en 404
});

router.delete("/", (req, res) => {
    // TODO: lägg till en 404
});

module.exports = router