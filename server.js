// all of this may be wrong...
const express = require('express');
const path = require("path");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static(__dirname));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
