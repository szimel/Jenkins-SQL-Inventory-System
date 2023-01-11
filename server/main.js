const Validation = require("./controllers/validation")
const sqlDB = require('./controllers/sqlDB');

//middleware to check if logged in user
function isLoggedIn(req, res, next) {
  console.log('got to middleware')
  req.user ? next() : res.sendStatus(401);
};

module.exports = function(app) {
  app.get('/logout', Validation.logout);
  app.get('/auth/google/failure', Validation.failure);
  app.get('/test', sqlDB.test)
}
