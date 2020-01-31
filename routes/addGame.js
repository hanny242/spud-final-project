const express = require("express")
const router = express.Router()
const Author = require("../models/Author")
const Game = require("../models/Game")
const mongoose = require("mongoose")

router.get("/add-game", (req, res) => {
    Author.find({})
    .then((authors) => {
        res.render("newBook.hbs", {authors: authors})
    })
    .catch(err => console.log(err))
})

router.post("/add-game", (req, res) => {
    let newGame = {
        title: req.body.title,
        description: req.body.description,
        //we parse the id (string) to an ObjectId
        author: mongoose.Types.ObjectId(req.body.author),
        rating: req.body.rating
    }
    Game.create(newGame)
    .then(() => {
        //the method res.redirect takes a ROUTE that you are going to redirect to
        //so it has to be a route that you have defined somewhere in your app
        //in this case, it's the index route
        res.redirect('/game-collection')
    })
    .catch(err => console.log(err))
})

module.exports = router