//Dependencies
const express = require("express");
const path = require("path");
const db = require("./db/db.json");

//Setting up Express
const app = express();
const PORT = process.env.PORT || 3000;

//Setting up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//post
//writetofile include db in fs.writeFile()
//i think you have to do this when saving the "deleted version too"

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });