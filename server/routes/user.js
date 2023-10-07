const express = require("express");
const { addUser, authPage } = require("../controller/user");
const { login, logout } = require("../controller/auth");
const passport = require("passport");

const router = express.Router();

require("../middleware/passport");
require("../config/passportGoogle");

router.post("/signin", addUser);
router.post("/login", login);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/profile",
  passport.authenticate("jwt", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/signin",
    session: false,
  }),
  authPage
);

router.delete("/logout", logout);

module.exports = router;
