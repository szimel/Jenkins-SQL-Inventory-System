const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config()

//connect to db
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 's0mu3l',
  database: 'jenkinsdb'
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      pool.query('SELECT * FROM users WHERE email = ?', [email], 
      async (err, result) => {
        if (err) {
          return done(err);
        }
        const user = result[0];

        if (!user) {
          return done(null, false, { status: 401, message: 'Invalid credentials' });
        }

        // Compare the password
        const isValid = await bcrypt.compare(password, user.password);

        // If the password is invalid
        if (!isValid) {
            return done(null, false, { status: 401, message: 'Invalid credentials' });
        }

        // Otherwise, return the user
        return done(null, user);
      });
    } catch (err) {
        return done(err);
    }
  }
));


const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secret
};


//for login and token authorization
passport.use(new JWTStrategy(jwtOptions, (payload, done) => {
  pool.query('SELECT * FROM users WHERE id = ?', [payload.sub], (error, results) => {
    if (error) return done(error);

    const user = results[0];

    if (!user) return done(null, false);
    
    return done(null, user);
  });
}));






passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  pool.query('SELECT * FROM users WHERE id = ?', [id], function (err, rows) {
    done(err, rows[0]);
  });
});





