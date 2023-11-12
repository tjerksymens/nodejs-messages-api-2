// require the Message model
const Message = require("../../../models/Message");

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
    let message = req.body.message;
    let m = new Message();
    m.message = message;
    await m.save();

    res.json({
        status: "success",
        message: "POST a new message",
        data: [
            {
                message: m,
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
