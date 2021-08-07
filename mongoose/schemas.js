const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: String,
    members: Array,
    result: Array,
});

const Room = new mongoose.model("Room", roomSchema);

module.exports = {
    Room
};