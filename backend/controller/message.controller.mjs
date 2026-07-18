import messages from "../models/message.model.mjs";
import { signup } from "../models/user.model.mjs";
import MessageSchema from "../pgsqlModels/messageModel.js";

const MS = new MessageSchema();

export class MessageController {
  async createMessage(req, res) {
    try {
      const { name, phone, email, senderId, senderMessage, type } = req.body;

      const user = await signup.findById(senderId);

      let userStatus;
      !user ? (userStatus = "anonymous") : (userStatus = "user");

      const message = new messages({
        senderName: name,
        senderPhone: phone,
        senderEmail: email,
        senderId: user._id || null,
        message: senderMessage,
        messageType: type,
        status: "notseen",
        userStatus,
      });

      await message.save();
      await Promise.resolve(MS.createMessage(message._id));
      res.status(200).send({ message: "message send successfully" });
    } catch (err) {
      console.log("createMessage error check messge controller!!");
      console.log("Error".red, err);
    }
  }

  async displayMessage(req, res) {
    try {
      const id = req.param.id;

      const message = await message.findById(id);
      if (!message) {
        return next({
          status: 404,
          statusText: "Message not found",
          message: null,
          errorDetails: null,
        });
      }
      res.render("admin/message-display", {
        pagetitle: "messages",
        message,
      });
    } catch (err) {
      console.log("Display message error check message controller");
      console.log(err);
    }
  }
  async toggleStatus(req, res) {
    const { id, status } = req.body;
    const message = await message.findById(id);
  }
}
