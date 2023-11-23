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
      } = req.body;

      // console.log("Req Body: ", req.body);
      // console.log("Req Files: ", req.files);

      // Convert file buffer to Data URI
      const extName = path
        .extname(req.files.imagesBackground[0].originalname)
        .toString();
      const bgDataUri = parser.format(
        extName,
        req.files.imagesBackground[0].buffer
      );

      const ext1Name = path
        .extname(req.files.image1[0].originalname)
        .toString();
      const img1DataUri = parser.format(ext1Name, req.files.image1[0].buffer);

      const ext2Name = path
        .extname(req.files.image2[0].originalname)
        .toString();
      const img2DataUri = parser.format(ext2Name, req.files.image2[0].buffer);

      const ext3Name = path
        .extname(req.files.image3[0].originalname)
        .toString();
      const img3DataUri = parser.format(ext3Name, req.files.image3[0].buffer);

      console.log("BG Image", bgDataUri);
      console.log("Image 1", img1DataUri);
      console.log("Image 2", img2DataUri);
      console.log("Image 3", img3DataUri);

      // // Upload Images' Data URI to Cloudinary
      // const [bgUpload, img1Upload, img2Upload, img3Upload] = await Promise.all([
      //   cloudinary.uploader.upload(bgDataUri.content),
      //   cloudinary.uploader.upload(img1DataUri.content),
      //   cloudinary.uploader.upload(img2DataUri.content),
      //   cloudinary.uploader.upload(img3DataUri.content),
      // ]);

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
        // images: {
        //   background: bgUpload.secure_url,
        //   image1: img1Upload.secure_url,
        //   image2: img2Upload.secure_url,
        //   image3: img3Upload.secure_url,
        // },
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

      res.status(200).json(project);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while retrieving the projec" });
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
