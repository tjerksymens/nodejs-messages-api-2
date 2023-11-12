const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    // user is a required string
    user: {
        type: String,
        required: true,
        unique: true,
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;