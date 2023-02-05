const Auth = require("./controllers/authorization")
const passportService = require('./services/passport');
const sqlDB = require('./controllers/sqlDB');
const passport = require('passport');

//middleware to check if logged in user
const requireAuth = passport.authenticate('local', { session: false })
const checkToken = passport.authenticate('jwt', { session: false })

module.exports = function(app) {
  app.post('/signup', Auth.signUp);
  app.post('/login', requireAuth, Auth.logIn);
  app.get('/user', checkToken, Auth.currentUser);
  app.post('/product', checkToken, sqlDB.newProduct);
  app.get('/product', checkToken, sqlDB.getProduct);
  app.get('/jobsites', checkToken, sqlDB.getJobsite)
  app.post('/jobsite', checkToken, sqlDB.newJobsite);
  app.get('/jobsite', checkToken, sqlDB.getJobsites);
  app.post('/jobsite/products', checkToken, sqlDB.getJobsiteProds);
  app.post('/product/edit', checkToken, sqlDB.editProduct);
  app.post('/product/delete', checkToken, sqlDB.deleteProduct);
}


