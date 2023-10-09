const express = require("express");
const app = express();
const port = 3000;
var session = require("express-session");

require("../models/db_connection");
const userRouter = require("../routes/user");
const passport = require("passport");
const { authPage } = require("../controller/user");

require("../middleware/passport");

app.use(express.json());

app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.session());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
