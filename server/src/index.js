const express = require("express");
const app = express();
const port = 3000;
var session = require("express-session");

require("../models/db_connection");
const userRouter = require("../routes/user");
const passport = require("passport");

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);
// app.use("/",userRouter)

// const { google } = require("googleapis");

// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.REDIRECT_URL
// );

app.get(
  "/outhcallback",
  passport.authenticate("google", {
    successRedirect: "/users/profile",
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    res.send(`Hello ${req.user.name}`);
  }
);


// const authUrl = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: [ 'email', 'profile' ] ,
//   })
// console.log(authUrl);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
