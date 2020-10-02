//Dependencies
const express = require("express");
const path = require("path");
let db = require("./db/db.json");
const fs = require("fs");

//Setting up Express
const app = express();
const PORT = process.env.PORT || 3000;

//Setting up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//Display notes 
app.get("/api/notes", function (req, res) {

    res.json(db);

});


//Post notes
app.post("/api/notes", function (req, res) {
    //Assigning IDs. For loop accounts for deleted notes.
    const addNote = req.body
    if (db.length === 0) {
        addNote.id = 1
    }
    else {
        for (i = 0; i < db.length; i++) {
            addNote.id = db[i].id + 1;
        }
    }
    //New note added to array in db.json
    db.push(addNote)

    const newNotes = JSON.stringify(db)
    fs.writeFile("./db/db.json", newNotes, err => {
        if (err)
            throw err;
    })

    res.json(newNotes)
});

//Remove deleted note from sidebar
app.delete("/api/notes/:id", function (req, res) {
    db = db.filter(db => db.id != req.params.id)

    //Rewrite file w/ deleted note removed
    const deletedNotes = JSON.stringify(db);
    fs.writeFile("./db/db.json", deletedNotes, err => {
        if (err)
            throw err;
    })
    res.json(deletedNotes)
})

//Routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});