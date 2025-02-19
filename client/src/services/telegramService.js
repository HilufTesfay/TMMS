import axios from "axios";
import authService from "./authService";
const botToken = "7351564421:AAEAHBKREZH1zdipJm6gX0MgDVU4zO2Ab3A";
const chatId = -1002379394590;
let lastMessageId = null;
const sendMessage = async (blockNumber, roomNumber) => {
  const date = new Date().toLocaleString();
  const message = `date: ${date}
  instructor:  ${authService.getName()}
  loaction: 
      Block: ${blockNumber} 
      Room: ${roomNumber}\n `;
  try {
    lastMessageId = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
      }
    );
    alert("Message sent to Telegram channel!");
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    alert("Failed to send message to Telegram channel.");
  }
};
const deleteLastMessage = async () => {
  if (lastMessageId) {
    const botToken = "YOUR_BOT_TOKEN"; // Replace with your bot token
    const chatId = "-YOUR_CHANNEL_CHAT_ID"; // Replace with the channel's chat ID

    try {
      await axios.post(
        `https://api.telegram.org/bot${botToken}/deleteMessage`,
        {
          chat_id: chatId,
          message_id: lastMessageId,
        }
      );
      alert("Last message deleted!");
      lastMessageId = null; // Reset the lastMessageId
    } catch (error) {
      console.error("Error deleting message from Telegram:", error);
      alert("Failed to delete the last message.");
    }
  } else {
    alert("No message to delete!");
  }
};

export default { sendMessage, deleteLastMessage };
