const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

const db = require("../models/db_connection");
var User = db.user;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URL,
      scope: ["email", "profile"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // console.log(profile);
      console.log("AccessToken", accessToken);
      console.log("RefreshToken", refreshToken);

      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = { passport };
