const fs = require("fs");
const path = require('path')

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        
        fs.readFile("./db/db.json", "utf-8", function (err, data) {
            if (err) throw err;
            const files = JSON.parse(data);
            res.json(files)
        });

        app.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, "./public/index.html"));
        });

        app.get("/notes", function (req, res) {
            res.sendFile(path.join(__dirname, "./public/notes.html"));
        });


    });

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
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