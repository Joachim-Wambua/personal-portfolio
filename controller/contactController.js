const Contact = require("../dbSchemas/contactSchema");

class ContactController {
  async createMessage(req, res) {
    try {
      // Get request body data
      const { name, email, subject, message } = req.body;

      const newMessage = new Contact({
        name,
        email,
        subject,
        message,
      });

      // Save the message
      await newMessage.save();

      res.status(201).json({ message: "Message Added Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while adding message to the database",
      });
    }
  }

  // RETRIEVE MESSAGES
  async readMessages(req, res) {
    try {
      // Get Messages from DB
      const contactMessage = await Contact.find();
      res.status(200).json(contactMessage);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while retrieving messages!" });
    }
  }

  // GET A SINGLE MESSAGE
  async getMessageById(req, res) {
    try {
      // Get ID from request params
      const { id } = req.params;

      const contact = await Contact.findById(id);

      // Does experience exist?
      if (!contact) {
        return res.status(404).json({ message: "Message Not Found!" });
      }

      res.status(200).json(contact);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while retrieving the message" });
    }
  }

  // DELETE MESSAGES
  async deleteMessage(req, res) {
    try {
      const { id } = req.params; //Extract the Message ID from the URL

      // Find and delete the work experience by its ID
      const deletedMessage = await Client.findByIdAndDelete(id);

      if (!deletedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }

      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the message" });
    }
  }
}

module.exports = new ContactController();
