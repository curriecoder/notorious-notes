// requiring modules
const express = require('express');

require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3001;

// set data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));


// listen at port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
