
function checkNewNote(req, res, next) {

    const { title, text } = req.body;

    const maxTitleLength = 50;
    const maxTextLength = 300;

    if( !("title" in req.body) || !("text" in req.body)){
        res.status(400).json({
            success: false,
            message: "Error! 'title' och/eller 'text' saknas"
        })
    }
    else if( !(typeof(title) === "string") || !(typeof(text) === "string")){
        res.status(400).json({
            success: false,
            message: "Error! 'title' och 'text' måste innehålla strängar"
        })
    }
    else if(title.length > maxTitleLength || text.length > maxTextLength) {
        res.status(400).json({
            success: false,
            message: `Error! Innehållet i 'title'/'text' får bestå av högst ${maxTitleLength} och ${maxTextLength} tecken`
        })
    }
    else {
        next();
    }
}

function checkDeleteId(req, res, next) {
    if( !('id' in req.body)) {
        res.status(400).json({
            success: false,
            message: "Error! ID saknas"
        })
    }
    else {
        next();
    }
}

module.exports = { checkNewNote, checkDeleteId }