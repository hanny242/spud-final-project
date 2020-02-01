const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const User = mongoose.model("user", new Schema ({
  userId: String,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  friends: [{type: ObjectId, ref: "user"}],
  gameCollection: [{type: ObjectId, ref: "game-collection"}],
  googleID: String,
  steamId: String
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}));

module.exports = User;