const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    room_name: String,
    members: Array,
    result: Array,
});

const Room = new mongoose.model("rooms", roomSchema);

module.exports = {
    Room,
};