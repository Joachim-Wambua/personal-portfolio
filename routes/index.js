const express = require("express");
const cors = require("cors");
const multer = require("multer"); // Add multer
const ProjectController = require("../controller/projectController.js");
const ExperienceController = require("../controller/experienceController.js");
const ContactController = require("../controller/contactController.js");
const AuthController = require("../controller/authController");

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Configure multer to handle file uploads and form data
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Defining Routes

// AUTHENTICATION ROUTES
router.post("/register", AuthController.registerUser);
router.post("/user-login", AuthController.loginUser);
router.post("/logout", AuthController.logoutUser);

// CREATING ITEMS
router.post(
  "/submit-project",
  upload.fields([
    { name: "imagesBackground", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  ProjectController.createProject
);
router.post("/submit-work-experience", ExperienceController.createWorkXp);
router.post(
  "/submit-contact-message",
  upload.none(),
  ContactController.createMessage
);

// READING ITEMS
router.get("/get-projects", ProjectController.readProjects);
router.get("/get-work-xp", ExperienceController.readWorkXP);
router.get("/get-messages", ContactController.readMessages);

// RETRIEVING SINGLE ITEMS BY ID
router.get("/get-project/:id", ProjectController.getProjectById);
router.get("/get-workxp/:id", ExperienceController.getWorkXpById);
router.get("/get-message/:id", ContactController.getMessageById);

// UPDATING ITEMS
router.put("/update-project/:id", ProjectController.updateProject);
router.put("/update-work-experience/:id", ExperienceController.updateWorkXP);
// router.put("/update-message/:id", ContactController.updateMessage);

// DELETING ITEMS
router.delete("/delete-project/:id", ProjectController.deleteProject);
router.delete("/delete-work-experience/:id", ExperienceController.deleteWorkXP);
router.delete("/delete-message/:id", ContactController.deleteMessage);

module.exports = router;
