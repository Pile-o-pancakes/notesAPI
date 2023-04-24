const express = require('express');
const app = express();
const port = process.env.port || 8000

const notesRouter = require('./routes/notes');

app.use(express.json());

app.use('/api/notes', notesRouter);

app.listen(port, (req, res) => {
    console.log(`Server startad på port: ${ port }`)
})