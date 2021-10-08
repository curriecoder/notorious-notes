// requiring modules
const PORT = process.env.PORT || 3001;

const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

const notes = require("./db/db.json");


// set data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// create /notes path
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// create static path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


// create /api/notes path
app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
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


function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i++) {
    let note = notesArray[i];

    if (note.id == id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArray, null, 2)
      );

      break;
    }
  }
};

app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, allNotes);
  res.json(true);
});

  // listen at port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`));
