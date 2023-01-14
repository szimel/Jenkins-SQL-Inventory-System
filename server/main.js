const Auth = require("./controllers/authorization")
const sqlDB = require('./controllers/sqlDB');
const passport = require('passport');


console.log(passport._strategies);

//middleware to check if logged in user
const requireAuth = passport.authenticate('local', { session: false })

module.exports = function(app) {
  app.post('/signup', Auth.signUp);
  app.post('/login', requireAuth, Auth.logIn);
  // app.get('/logout', Validation.logout);
  // app.get('/auth/google/failure', Validation.failure);
  // app.get('/test', sqlDB.test)
}


