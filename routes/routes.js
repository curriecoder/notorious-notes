// requiring modules
const path = require("path");
const fs = require("fs");
const app = express();

require("./routes/routes");



// use index.html for static display 
// app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// retrieve existing notes from db/db.json
fs.readFile("db/db.json", "utf8", (err, data) => {
  if (err) throw err;
  
  const notes = JSON.parse(data);
  
  function updateDb() {
    fs.writeFile("db/db.json", JSON.stringify(notes, '/t'), (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  }
  
  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });
  
  // write notes to db/db.json
  app.post("/api/notes", (req, res) => {
    let newNote =req.body;
    notes.push(newNote);
    updateDb();
    return console.log(`Added note: ${newNote.title}!`);
  });

  app.get('/api/notes/:id', (req, res) => {
    res.json(notes[req.params.id]);
  });

  app.delete('/api/notes/id:', (req, res) => {
    notes.splice(req.params.id, 1);
    updateDb();
    console.log(`Note ${req.params.id} deleted!`);
  });
});




  

module.exports = app;