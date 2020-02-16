var express = require('express');
var router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get('/', function(req, res, next) {
   let currentUser = req.user;

   currentUser.getFriends(User, (friends) => {
        return friends;
   })
});

module.exports = router;