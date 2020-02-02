const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post('/', (req, res) => {
    if (!req.isAuthenticated())
    {
        res.send(401);
    }
    // Use passport user to get logged in user
    var currentUser = req.user;
    
    var conditions = {"username": req.body.username};
    
    // Find user model by username
    User.findOne(conditions)
    .then(user => {        
        var friendUser = user;
        // Make users friends
        User.requestFriend(currentUser._id, friendUser._id, (err, result) => {            
            User.requestFriend(friendUser._id, currentUser._id, (err, result) => {
                if (err)
                {
                    res.send(500);
                }
                else
                {
                    res.send(200);
                }
            });
        });
    });        
});

module.exports = router;

