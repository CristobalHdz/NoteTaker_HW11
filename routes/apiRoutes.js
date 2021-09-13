const fs = require("fs");
const path = require('path');

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data))
        })
    });


    app.post("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
            if (err) throw err;
            let addNote = req.body;
            let noteArray = (JSON.parse(data));
            let id = noteArray[noteArray.length - 1].id + 1;
            addNote.id = id;
            noteArray.push(addNote)
            let noteString = JSON.stringify(noteArray);
            fs.writeFileSync(path.join(__dirname, "../db/db.json"), noteString)
            console.log(`Note added.`)
        })
    });

    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
            if (err) throw err;
            let notesArr = (JSON.parse(data));
            let newNotesArr = []
            for (i = 0; i < notesArr.length; i++) {
                if (notesArr[i].id != req.params.id) {
                    newNotesArr.push(notesArr[i]);
                }
            }
            let notesString = JSON.stringify(newNotesArr);
            fs.writeFileSync(path.join(__dirname, "../db/db.json"), notesString)
            console.log(`Note removed!`)
        })
    });
};