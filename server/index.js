const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("../db/index.js");

app.use(express.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.json("🐳")
})


app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`)}
)