// require express
const express = require("express");
// create a new router
const router = express.Router();

// import controller
const messagesController = require("../../../controllers/api/v1/messages");

router.get("/", messagesController.index);
router.get("/:id", messagesController.show);
router.post("/", messagesController.create);
router.post("/:username", messagesController.createWithUsername);
router.put("/:id", messagesController.update);
router.delete("/:id", messagesController.deleteMessage);

module.exports = router;
