const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config()

// const GOOGLE_CLIENT_ID = '136021921497-6u7voc87hidqc7k9q2emno1q2faputub.apps.googleusercontent.com'
// const GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  console.log('request is: ' + request);
  console.log('access token is:' + accessToken);
  console.log('refresh token is:' + refreshToken);
  console.log('profile is:' + profile)
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
