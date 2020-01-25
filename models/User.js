const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({

  userId: String,
  username: String,
  password: String,
  email: String,
  friends: [String],
  gameCollection: [String],
  googleID: String,
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("user", userSchema);

module.exports = User;