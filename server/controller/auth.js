var db = require("../models/db_connection");
const { generateToken, storeToken } = require("../controller/user");
const bcrypt = require("bcryptjs");

var User = db.user;
var Token = db.token;

const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user !== null) {
      const hashedPassword = user.password;
      const isMatch = bcrypt.compare(req.body.password, hashedPassword);

      if (isMatch) {
        const token = generateToken(user.id);
        // const token = await storeToken(createdToken, user.id);

        const { id, email } = user;
        res.status(200).send({
          success: true,
          user: { id, email },
          token,
        });
      }
    } else {
      res.send("User already exists");
    }
  } catch (e) {
    console.log(e.message);
    res.send("User already exists");
  }
};

const logout = async (req, res) => {
  try {
    req.logout(()=>{
      console.log("fd")
    })
    res.send('Logout')
  } catch (e) {
    console.log(e);
    res.send("No token");
  }
};
module.exports = { login, logout };
