const path = require("path");
const DatauriParser = require("datauri/parser");
const cloudinary = require("cloudinary").v2;

const Project = require("../dbSchemas/projectSchema");

const parser = new DatauriParser();

class ProjectController {
  //create a new project
  async createProject(req, res) {
    try {
      // Get data from the request body
      const {
        title,
        date,
        author,
        client,
        category,
        services,
        description,
        url,
        imagesBackground,
        image1,
        image2,
        image3,
      } = req.body;

      // Create a new Project instance
      const newProject = new Project({
        title,
        date,
        author,
        client,
        category,
        services,
        description,
        url,
        images: {
          background: imagesBackground,
          image1,
          image2,
          image3,
        },
      });

      // Save the new project to the database
      await newProject.save();

      res.status(201).json({ message: "Project Added Successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while adding the project" });
    }
  }

  // RETRIEVE PROJECTS
  async readProjects(req, res) {
    try {
      // Get Projects from DB
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while retrieving projects!" });
    }
  }

  // UPDATE PROJECT
  async updateProject(req, res) {
    try {
      const { id } = req.params; // Get the ID from the request parameters
      const updatedData = req.body; // Get the updated data from the request body

      // Use Mongoose or your preferred database library to update the item by ID
      const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      res
        .status(200)
        .json({ message: "Project updated successfully", updatedProject });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the project" });
    }
  }

  // GET SINGLE PROJECT
  async getProjectById(req, res) {
    try {
      const { id } = req.params; // Get the ID from the request parameters

      // Find the project by its ID
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Debug Project reading from Database
      // console.log(project);

      // Render the project detail page dynamically
      res.render("project-detail", { project });
      // res.status(200).json(project);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while retrieving the project!" });
    }
  }

  // DELETE PROJECT
  async deleteProject(req, res) {
    try {
      const { id } = req.params; //Extract the Project ID from the URL

      // Find and delete the projects by its ID
      const deletedProject = await Project.findByIdAndDelete(id);

      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the project" });
    }
  }
}

module.exports = new ProjectController();
