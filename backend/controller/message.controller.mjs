import messages from "../models/message.model.mjs";
async function messages(req, res) {
  try {
    const { name, emailId, phoneNumber, type, gender, rating, comments } =
      req.body;

    const newMessage = new messages({
      name,
      emailId,
      phoneNumber,
      type,
      gender,
      reason,
      rating,
      comments,
    });
    await newMessage.save();
  } catch (error) {
    console.log("Check Message controller.", error.message, error.detail);
  }
}
async function displayMessage(req, res) {
  try {
  } catch (error) {}
}
const messageController = { messages, displayMessage };
export default messageController;
