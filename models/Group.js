const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User = require("/models/User");

const groupSchema = new Schema({
  members: [User.userId],
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("group", groupSchema);

module.exports = Group;