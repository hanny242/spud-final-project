const express = require("express");
const router = express.Router();
const Game = require("../models/Game.js");
const User = require("../models/User");

var userGameCollection = [{}]

router.get("/", (req, res) => {
    User.findById(req.session.passport.user._id)
    .populate("gameCollection")
    .then(({gameCollection}) => {
        res.json(gameCollection)
    })
    .catch((err) => console.log(err))
})

module.exports = router