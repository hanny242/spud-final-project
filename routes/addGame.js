const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser").json();
const User = require("../models/User");

router.post("/", (req, res, next) => {
debugger;
  const addedGame = req.body.gameid;
  const conditions =  req.body._id

  User.findByIdAndUpdate(conditions,
    {$push: {gameCollection: addedGame}},
    {safe: true, upsert: true},
    function(err, result) {
        if(err){
        console.log(err);
        }else{
        res.send(result);
        }
    }
);

  // addedGame.save(err => {
  //   if (err) {
  //     res.render( {
  //       message: "An error occurred"
  //     });
  //   } else {
  //     res.redirect("/");
  //   }
  // });

  
  // Add game to user (from id) to their collection
 
  // user.gameCollection.push(addedGame);

  // User.findByIdAndUpdate(req.params.user._id, user, { new: true })
  //   .catch(err => console.log(err)); 

});

module.exports = router;
