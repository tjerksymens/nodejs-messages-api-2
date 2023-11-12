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

// delete a message with :id
const deleteMessage = async (req, res) => {
    let message = await Message.findById(req.params.id);
    await message.remove();
    res.json({
        status: "success",
        message: "The massage was removed",
        data: [
            {
                message: message,
            },
        ],
    });
};



module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.deleteMessage = deleteMessage;
