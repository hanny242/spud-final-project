const express = require("express");
const router = express.Router();
const Game = require("../models/Game.js");
const User = require("../models/User");

var userGameCollection = [{}]

router.get("/gamecollection", (req, res) => {
    Game.find(User){
        for(User.gameCollection.ObjectId in User){
            if(User.gameCollection.ObjectId === Game.ObjectId)
        }
    }
    )
    .then((game) => {
        res.send('respond with a resource')
    })
    .catch((err) => console.log(err))
})

module.exports = router