const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

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

      pool.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
          return done(err);
        }
        const user = result[0];

        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        // Compare the password
        const isValid = bcrypt.compare(password, user.password);

        // If the password is invalid
        if (!isValid) {
            return done(null, false, { message: 'Invalid credentials' });
        }

        // Otherwise, return the user
        return done(null, user);
      });

        // Find the user with the email
        // const [user] = await pool.query(
        //     'SELECT * FROM users WHERE email = ?',
        //     [email]
        // );

        // If no user is found with the email
        // if (!user) {
        //     return done(null, false, { message: 'Invalid credentials' });
        // }

        // // Compare the password
        // const isValid = await bcrypt.compare(password, user.password);

        // // If the password is invalid
        // if (!isValid) {
        //     return done(null, false, { message: 'Invalid credentials' });
        // }

        // // Otherwise, return the user
        // return done(null, user);
    } catch (err) {
        return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  pool.query('SELECT * FROM users WHERE id = ?', [id], function (err, rows) {
    done(err, rows[0]);
  });
});



