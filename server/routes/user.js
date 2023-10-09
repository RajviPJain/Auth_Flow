const express = require("express");
const { addUser, authPage } = require("../controller/user");
const { login, logout } = require("../controller/auth");
const passport = require("passport");

const router = express.Router();
const isAuthenticated = require("../middleware/auth");

require("../middleware/passport");
require("../config/passportGoogle");

router.post("/signin", addUser);
router.post("/login", login);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/authcallback",
  passport.authenticate("google", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/auth/google",
  })
);
router.get(
  "/localauth",
  passport.authenticate("jwt", {
    // successRedirect:"/users/profile",
    failureRedirect: "/users/signin",
    session: true,
  }),
  (req, res) => {
    console.log(req.isAuthenticated());
    res.redirect("/users/profile");
  }
);

router.get("/profile", isAuthenticated, authPage);
router.get("/welcome", isAuthenticated, (req, res) => {
  res.send("Welcome");
});

router.delete("/logout", logout);

module.exports = router;
