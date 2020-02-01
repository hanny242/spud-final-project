const express = require("express");
const bodyParser = require("body-parser").json();
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

//signup
router.get("/", (req, res, next) => {
  res.render("/signup");
});

router.post("/", bodyParser, (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  if (username === "" || password === "") {
    res.render("/signup", { message: "Please fill out username and password" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("/signup", { message: "This username is already taken" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      lastName,
      firstName,
      email
    });

    newUser.save((err) => {
      if (err) {
        res.render("/signup", { message: "An error occurred during signup" });
      } else {
        res.redirect("/");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

module.exports = router