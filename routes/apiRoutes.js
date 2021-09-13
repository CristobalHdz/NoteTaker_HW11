const fs = require("fs");
const path = require('path');
const { isDataView } = require("util/types");

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data))
        })
    });


    app.post("/api/display_all_notes", function (req, res) {
        var note = req.body;

        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) throw err;
            let noteData = JSON.parse(data)
            noteData.push(note)
            fs.writeFile("./db/db.json", JSON.stringify(noteData), function (err) {
                if (err) throw err;
            })
        });
    });

    app.delete("/api/display_all_notes/:id", function (req, res) {
        let idDelete = req.params.id;
        let objDelete = showNotes.find(note => note.id == idDelete);
        let indexDelete = showNotes.indexOf(objDelete);
        showNotes.splice(indexDelete, 1);
    });

};