// requiring modules
const PORT = process.env.PORT || 3001;

const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");


// set data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// create static path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// create /notes path
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// create /api/notes path
app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});



function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray)) notesArray = [];

  if (notesArray.length === 0) notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  // push new note to notesArray
  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
})

  // listen at port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`));
