exports.validation = function(req, res, next) {
  res.send(req.user);
}


//logout endpoint
exports.logout = function(req, res, next) {
  console.log('got here')
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
};

//when fail to auth
exports.failure = function(req, res, next) {
  res.send('Failed to authenticate...');
}