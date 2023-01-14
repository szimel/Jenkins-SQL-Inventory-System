// // //for if the above auth by JWT token doesn't work
// const passportJWT = require("passport-jwt");
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

// passport.use(new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey: "secret"
//     },
//     async function (jwtPayload, cb) {
//         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//         const connection = await pool.getConnection();
//         try {
//             const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [jwtPayload.id]);
//             if (!user) {
//               // console.log(typeof cb)
//               // console.log(cb)
//                 return cb(null, false);
//             }
//             return cb(null, user);
//         } catch (err) {
//             return cb(err);
//         } finally {
//             connection.release();
//         }
//     }
// ));

//connect to db
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 's0mu3l',
  database: 'jenkinsdb'
});


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
async (email, password, done) => {
  try {
      // Find the user with the email
      const [user] = await pool.query(
          'SELECT * FROM users WHERE email = ?',
          [email]
      );

      // If no user is found with the email
      if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
      }

      // Compare the password
      const isValid = await bcrypt.compare(password, user.password);

      // If the password is invalid
      if (!isValid) {
          return done(null, false, { message: 'Invalid credentials' });
      }

      // Otherwise, return the user
      return done(null, user);
  } catch (err) {
      return done(err);
  }
}
));


