const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

const db = require("../models/db_connection");
var User = db.user;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/outhcallback",
      scope: ["email", "profile"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      const user = await User.findOne({ where: { email: profile.email } });
      console.log(user);
      if (!user) {
        const newUser = await User.create({
          email: profile.email,
        });
        return done(null, newUser);
      } else {
        return done(null, false);
        // or you could create a new account
      }
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
