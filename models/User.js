const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId
const friends = require("mongoose-friends")

const User = mongoose.model("user", new Schema ({
  userId: String,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  pendingFriends: [{type: ObjectId, ref: "user"}],
  gameCollection: [{type: ObjectId, ref: "game-collection"}],
  googleID: String,
  steamId: String
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}).plugin(friends()));

module.exports = User;