const db = require("../models/db_connection");
const passport = require("passport");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

var User = db.user;
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload);
    const user = await User.findOne({ where: { id: jwt_payload._id } });
    console.log(user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  })
);

module.exports = { passport };
