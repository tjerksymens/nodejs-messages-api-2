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

// post a message
const create = async (req, res) => {
    let messageText = req.body.message;
    let message = new Message();
    message.message = messageText;
    await message.save();
    res.json({
        status: "success",
        message: "POST a new message",
        data: [
            {
                message: message,
            },
        ],
    });
};

const createWithUsername = async (req, res) => {
    let messageText = req.body.message;
    let username = req.params.username;
    
    // Check if user exists
    let user = await User.findOne({ user: username });

    // If user does not exist, create a new user
    if (!user) {
        user = new User();
        user.user = username;
        await user.save();
    }

    let message = new Message();
    message.message = messageText;
    message.user = user._id;
    await message.save();

    res.json({
        status: "success",
        message: "POST a new message with username " + req.params.username,
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
    const id = req.params.id;

    try {
        const deletedMessage = await Message.findByIdAndRemove(id);

        if (!deletedMessage) {
            return res.status(404).json({
                status: "error",
                message: "Message not found",
            });
        };

        res.json({
            status: "success",
            message: "The message with id " + id + " was deleted",
            data: {
                message: deletedMessage,
            },
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};


module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.createWithUsername = createWithUsername;
module.exports.update = update;
module.exports.deleteMessage = deleteMessage;
