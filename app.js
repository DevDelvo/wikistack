const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const layout = require("./views/layout");

const app = express();

app.use(morgan("dev"));
// app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

// main route
app.get("/", (req, res, next) => {
  res.send(layout());
  console.log("Hello World!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
