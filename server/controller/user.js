var db = require("../models/db_connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var User = db.user;
var Token = db.token;

const generateToken = (id) => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "1 day",
  });

  return token;
};

const storeToken = async (createdToken, id) => {
  const token = await Token.create({
    token: createdToken,
    userId: id,
  });
  return token;
};
const addUser = async (req, res) => {
  try {
    const isUser = await User.findOne({ where: { email: req.body.email } });

    if (isUser === null) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        email: req.body.email,
        password: hashedPassword,
      });
      const token = generateToken(user.id);
      //    console.log(createdToken)
      // const token = await storeToken(createdToken, user.id);

      res.send({ user, token });
    } else {
      res.send("User already exists");
    }
  } catch (e) {
    console.log("User already exists");
    res.send("User already exists");
  }
};

const authPage = async (req, res) => {
  res.status(200).send({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
};

module.exports = { addUser, storeToken, generateToken, authPage };
