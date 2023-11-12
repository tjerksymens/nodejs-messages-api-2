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
    try {
        let message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                status: "error",
                message: "Message not found",
            });
        }

        await message.deleteOne();


        res.json({
            status: "success",
            message: "The massage with id " + req.params.id +  " was removed",
            data: [
                {
                    message: message,
                },
            ],
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Sever Error",
        });
    }
};

// get all messages from username
const getUserMessages = async (req, res) => {
    try{
        const username = req.params.username;

        //Find user
        const user = await User.findOne({ user: username });

        //If user does not exist, return error
        if(!user){
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        const messages = await Message.find({ user: user._id }).populate("user");

        res.json({
            status: "success",
            message: "GET all messages from user " + username,
            data: [
                {
                    user: user,
                    messages: messages,
                },
            ],
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Sever Error",
        });
    }
};



module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.createWithUsername = createWithUsername;
module.exports.update = update;
module.exports.deleteMessage = deleteMessage;
module.exports.getUserMessages = getUserMessages;
