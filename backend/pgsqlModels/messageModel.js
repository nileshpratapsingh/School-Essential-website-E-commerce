import BaseSchema from "./baseModel";
import { messages } from "../models/message.model.mjs";

class MessageSchema extends BaseSchema {
  async createMessage(id) {
    const message = await messages.findById(id);
    const data = {
      message_id: message._id.toString(),
      sender_name: message.senderName,
      sender_email: senderEmail,
      sender_id: message.senderId,
      message: message.message,
      message_type: message.messageType,
      created_at: Date.now(),
      status: message.status,
      user_status: message.userStatus,
    };
    const result = BaseSchema.createOne("message", data);
    console.log(result.rows);
    return result.rows;
  }

  async findMessage(id) {
    const message = BaseSchema.findOne("message", { message_id: id });
    if (!message) console.log("No backup message is found!!");
    return message.rows[0];
  }

  async findAll(tableName) {
    const result = BaseSchema.findAll(tableName);
    if (!result) return "No backup found!!";
    return result;
  }
}

export default MessageSchema;
