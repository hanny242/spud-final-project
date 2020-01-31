const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Group = mongoose.model("group", new Schema ({
  name: String,
  gameSession: String,
  members: [{type: ObjectId, ref: "user"}],
  imgae: String
}))

module.exports = Group;