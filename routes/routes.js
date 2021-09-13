const fs = require('fs')
const db = require('../db/db.json');
const path = require('path');
const { randomUUID } = require('crypto');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, db))
    })

    app.post('/api/notes', (req, res) => {
        let addNote = {
            id: randomUUID(),
            title: req.body.title,
            text: req.body.text
        };
        let currentNote = JSON.parse(fs.readFileSync(path.join(__dirname, db), 'utf-8'));
        currentNote.push(addNote);
        fs.writeFileSync(db, JSON.stringify(currentNote));
        res.json(currentNote);
    })

    app.delete('api/notes', (req, res) => {
        let choice = req.params.id;
        let currentNote = JSON.parse(fs.readFileSync(path.join(__dirname, db), 'utf-8'));
        const addNote = currentNote.filter(currentNote => currentNote.id != choice);
        fs.writeFileSync(db, JSON.stringify(addNote));
        res.json(addNote);
    })

};