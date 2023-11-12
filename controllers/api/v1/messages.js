// require the Message model
const Message = require("../../../models/Message");
const User = require("../../../models/User");

const index = async (req, res) => {
    let messages = await Message.find({});
    res.json({
        status: "success",
        message: "GET all messages",
        data: [
            {
                messages: messages,
            },
        ],
    });
};

//get message with id
const show = async (req, res) => {
    let message = await Message.findById(req.params.id);
    res.json({
        status: "success",
        message: "GET a message",
        data: [
            {
                message: message,
            },
        ],
    });
};

const create = async (req, res) => {
    let messageText = req.body.message;
    let username = req.params.username;

    let user = await User.findOne({ user: username });;

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found",
        });
    }
    
    let message = new Message();
    message.message = messageText;
    message.user = user._id;
    await message.save();

    res.json({
        status: "success",
        message: "POST a new message",
        data: [
            {
                user: user,
                message: message,
            },
        ],
    });
};

// put a message with :id
const update = async (req, res) => {
    let message = await Message.findById(req.params.id);
    message.message = req.body.message;
    await message.save();
    res.json({
        status: "success",
        message: "The message with id " + req.params.id + " was updated",
        data: [
            {
                message: message,
            },
        ],
    });
};

// delete a message with :id
const deleteMessage = async (req, res) => {
    let message = await Message.findById(req.params.id);
    message.message = req.body.message;
    await message.remove();
    res.json({
        status: "success",
        message: "The massage with id " + req.params.id +  " was removed",
        data: [
            {
                message: message,
            },
        ],
    });
};

// get a message where user = username
const getUserMessages = async (req, res) => {
    let messages = await Message.find({ user: req.params.username });
    res.json({
        status: "success",
        message: "GETTING message for username" + req.params.username,
        data: [
            {
                messages: messages,
            },
        ],
    });
};



module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.deleteMessage = deleteMessage;
module.exports.getUserMessages = getUserMessages;
