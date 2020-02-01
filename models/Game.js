const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const Game = mongoose.model("game-collection", new Schema ({
  name: String,
  gameSession: String,
  image: String,
  consoles: [],
  genre: String,
}),"game-collection")

module.exports = Game;