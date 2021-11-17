const express = require("express");
const app = express();
const PORT = 3000;
const db = require("../db/index.js");

app.use(express.json());
app.use(express.json());

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`)}
)