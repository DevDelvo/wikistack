const express = require('express');

const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(morgan('dev'));
// app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded( { extended: false }));

app.get("/", (req, res, next) => {
  console.log("Hello world");
})












const port = 3000;
app.listen(port, () => {
  console.log(`Listening to ${port} port`)
})
