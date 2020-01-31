const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSession = mongoose.model("gameSession", new Schema ({
    date: String,
    name: String,
    group: [{type: ObjectId, ref: "group"}],
    gamesPlayed: [{type: ObjectId, ref: "game"}],
    duration: Number
}));

module.exports = GameSession;