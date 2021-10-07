// requiring modules
const express = require("express");
const path = require("path");
const fs = require("fs");

require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3001;

// use index.html for static display 
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// retrieve existing notes from db/db.json
app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
  });
});

// write notes to db/db.json
app.post("/api/notes", (req, res) => {
  fs.writeFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
});
