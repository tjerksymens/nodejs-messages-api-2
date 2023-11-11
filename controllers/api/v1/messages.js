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

const update = async (req, res) => {
    let id = req.params.id;
    let message = req.body.message;
    let m = await Message.findOneAndUpdate(
        {
            _id: id,
        },
        {
            message: message,
        },
        {
            new: true,
        }
    );
    res.json({
        status: "success",
        message: "PUT a new message",
        data: [
            {
                message: m,
            },
        ],
    });
};

module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
