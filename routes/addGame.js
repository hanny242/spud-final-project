const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const User = require("../models/User");
const passport = require("passport");

// router.get("/test", (req, res, next) => {
//   console.log("'/test' call");
//   axios.get("https://api.rawg.io/api/games?page_limit=5&{$usersearch")
//     .then(data => res.json(data))
//     .catch(err => next(err));
// })

router.put("/", (req, res) => {
  if (!req.isAuthenticated())
  {
    res.send(401);
  }
  
  //Create game as a new model from Game
  const addedGame = req.body.gameid;

  addedGame.save(err => {
    if (err) {
      res.render("/game-collection", {
        message: "An error occurred during signup"
      });
    } else {
      res.redirect("/");
    }
  });

  
  // Add game to user (from id) to their collection
  var user = req.user
  user.gameCollection.push(addedGame._id);

  User.findByIdAndUpdate(user._id, user, { new: true })
    .catch(err => console.log(err)); 

});

module.exports = router;
