const Client = require("../dbSchemas/clientSchema");

class ClientController {
  // Create New Client
  async createClient(req, res) {
    try {
      // Get Data from Request body
      const { company, logoUrl } = req.body;

      const newClient = new Client({
        company,
        logoUrl,
      });

      // Save to DB
      await newClient.save();
      res.status(201).json({ message: "Client Added Successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An Error occurred while adding the client" });
    }
  }

  // RETRIEVE CLIENTS
  async readClients(req, res) {
    try {
      // Get Clients from DB
      const clients = await Client.find();
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while retrieving clients" });
    }
  }

  // UPDATE CLIENTS
  async updateClient(req, res) {
    try {
      const { id } = req.params; // Extract Client ID from URL
      const updatedData = req.body; // New data to update with

      // Find and update the work experience by its ID
      const updatedClient = await Client.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedClient) {
        res.status(404).json({ message: "Client Not Found!" });
      }

      res.status(200).json(updatedClient);
      res
        .status(200)
        .json({ message: "Client updated successfully", updatedClient });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the client" });
    }
  }

  async deleteClient(req, res) {
    try {
      const { id } = req.params; //Extract the Work XP ID from the URL

      // Find and delete the work experience by its ID
      const deletedClient = await Client.findByIdAndDelete(id);

      if (!deletedClient) {
        return res.status(404).json({ message: "Client Not Found!" });
      }

      res.status(200).json({ message: "Work experience deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the client" });
    }
  }
}

module.exports = new ClientController();
