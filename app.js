const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const layOut = require("./views/layout");
const { Page, User, db } = require("./models");
const path = require('path');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express(); //creates middleware app

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// main route
app.get("/", (req, res, next) => {
  res.redirect('/wiki');
});

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

module.exports = app;