const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./docs/docs.json');
const port = process.env.port || 8000

const notesRouter = require('./routes/notes');
const userRouter = require('./routes/user');
const { verifyToken } = require('./middlewares/verifyToken');

app.use(express.json());

app.use("/api/notes", verifyToken, notesRouter);
app.use("/api/user", userRouter);
app.use("/api/docs", swaggerUI.serve);

app.get("/api/docs", swaggerUI.setup(apiDocs));

app.listen(port, (req, res) => {
    console.log(`Server startad på port: ${ port }`)
})