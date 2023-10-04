const Experience = require("../dbSchemas/experienceSchema");

class ExperienceController {
  // CREATE
  async createWorkXp(req, res) {
    try {
      // Get data from request body
      const { role, company, startDate, endDate, description, images } =
        req.body;

      // Create new Work XP instance
      const newWorkExperience = new Experience({
        role,
        company,
        startDate,
        endDate,
        description,
        images,
      });

      //   Save to DB
      await newWorkExperience.save();

      // Success Message
      res.status(201).json({ message: "Work Experience Added Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while adding the work experience",
      });
    }
  }

  //  READ
  async readWorkXP(req, res) {
    try {
      // Get work experiences from db
      const workExperiences = await Experience.find();
      res.status(200).json(workExperiences);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "An error occurred while retrieving work experiences!",
        });
    }
  }

  // UPDATE
  async updateWorkXP(req, res) {
    try {
      const { id } = req.params; // Extract work experience ID from URL
      const updatedData = req.body; // New data to update with

      // Find and update the work experience by its ID
      const updatedWorkExperience = await Experience.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      if (!updatedWorkExperience) {
        return res.status(404).json({ message: "Work experience not found" });
      }

      res
        .status(200)
        .json({
          message: "Work Experience updated successfully",
          updatedWorkExperience,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "An error occurred while updating the work experience",
        });
    }
  }

  // GET A SINGLE WORK XP
  async getWorkXpById(req, res) {
    try {
      // Get ID from request params
      const { id } = req.params;

      const experience = await Experience.findById(id);

      // Does experience exist?
      if (!experience) {
        return res.status(404).json({ message: "Work Experience Not Found!" });
      }

      res.status(200).json(experience);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "An error occurred while retrieving the work experience",
        });
    }
  }

  // DELETE
  async deleteWorkXP(req, res) {
    try {
      const { id } = req.params; //Extract the Work XP ID from the URL

      // Find and delete the work experience by its ID
      const deletedWorkExperience = await Experience.findByIdAndDelete(id);

      if (!deletedWorkExperience) {
        return res.status(404).json({ message: "Work experience not found" });
      }

      res.status(200).json({ message: "Work experience deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "An error occurred while deleting the work experience",
        });
    }
  }
}

module.exports = new ExperienceController();
