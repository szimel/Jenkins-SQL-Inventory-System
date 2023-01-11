const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mysql = require('mysql');
const Validation = require('./controllers/validation');
const sqlDB = require('./controllers/sqlDB');
const mainRoutes = require('./main');
require('./auth');
require('dotenv').config()

//creates db for mysql?
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'jenkinsdb'
})


const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
};

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


//call from front end goes here 
app.get('/auth/google',
  //this calls to auth.js
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

//call from auth.js goes here 
app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: 'http://localhost:3000/inventory',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, Validation.validation);

app.get('/test', sqlDB.test)

//stores logout and sql db routes
mainRoutes(app)

//this could be turned into a route
// app.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('Goodbye!');
// });

//this could be turned into a route
// app.get('/auth/google/failure', (req, res) => {
//   res.send('Failed to authenticate...');
// });

app.listen(5000, () => console.log('listening on port: 5000'));
