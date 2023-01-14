const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");
const cors = require("cors");
const mainRoutes = require('./main');
const passportService = require('./services/passport');

// require('./auth');
require('dotenv').config()

const app = express();

//for cors and json setup
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//stores routes
mainRoutes(app)

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());





app.listen(5000, () => console.log('listening on port: 5000'));
