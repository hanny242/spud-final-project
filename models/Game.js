const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Game = mongoose.model("game", new Schema ({
  name: String,
  gameSession: String,
  image: String,
  consoles: [],
  genre: String,
}))

module.exports = Game;