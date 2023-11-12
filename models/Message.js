// create a mongoose schema for messages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    // message is a required string
    message: {
        type: String,
        required: true,
    },
});
const UserSchema = new Schema({
    // user is a required string
    user: {
        type: String,
        required: true,
    },
});
// export the model to use it in index.js
const Message = mongoose.model("Message", MessageSchema);
const User = mongoose.model("User", UserSchema);
module.exports = Message;
module.exports = User;