const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Validation = require('./controllers/validation');
const bodyParser = require("body-parser");
const cors = require("cors");
const mainRoutes = require('./main');

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


app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


//call from front end goes here 
// app.get('/auth/google',
//   //this calls to auth.js
//   passport.authenticate('google', { scope: [ 'email', 'profile' ] }
// ));

// function isLoggedIn(req, res, next) {
//   console.log('got to middleware on index')
//   req.user ? next() : res.sendStatus(401);
// };

// //call from auth.js goes here 
// app.get( '/auth/google/callback',
//   passport.authenticate( 'google', {
//     successRedirect: 'http://localhost:3000/inventory',
//     failureRedirect: '/auth/google/failure'
//   })
// );

// app.get('/protected', Validation.validation);


//stores routes
mainRoutes(app)



app.listen(5000, () => console.log('listening on port: 5000'));
