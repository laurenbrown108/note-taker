const { notStrictEqual } = require("assert");
//Dependencies
const express = require("express");
const { readFile, fstat } = require("fs");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

let notes = [];

//Setting up Express
const app = express();
const PORT = process.env.PORT || 3000;

//Setting up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

//Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//Display notes
app.get("/api/notes", function(req, res){
    notes = fs.readFileSync("./db/db.json", "UTF-8", err => {
        if (err)
        throw (err)
    })
    notes = JSON.parse(notes);
    console.log(notes);
    return res.json(notes);

});

//For loop for notes
function noteID() {
    for (i=0; i < notes.length; i++) {
        notes[i].id = i;
    }
}

//Post notes
app.post("/api/notes", function(req, res){
    const addNote = req.body
    db.push(addNote)
    const newVar = JSON.stringify(db)
    fs.writeFile("./db/db.json", newVar, err => {
        if (err)
        throw err;
    })
    res.json(notes)
});



//writetofile include db in fs.writeFile()
//i think you have to do this when saving the "deleted version too"

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });