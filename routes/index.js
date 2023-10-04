const express = require("express");
const cors = require("cors");
const ProjectController = require("../controller/projectController.js");
const ClientController = require("../controller/clientController.js");
const ExperienceController = require("../controller/experienceController.js");
const ContactController = require("../controller/contactController.js");
const AuthController = require("../controller/authController");

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Defining Routes

// AUTHENTICATION ROUTES
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

// CREATING ITEMS
router.post("/submit-project", ProjectController.createProject);
router.post("/submit-work-experience", ExperienceController.createWorkXp);
router.post("/submit-client", ClientController.createClient);
router.post("/submit-contact-message", ContactController.createMessage);

// READING ITEMS
router.get("/get-projects", ProjectController.readProjects);
router.get("/get-work-xp", ExperienceController.readWorkXP);
router.get("/get-clients", ClientController.readClients);
router.get("/get-messages", ContactController.readMessages);

// RETRIEVING SINGLE ITEMS BY ID
router.get("/get-project/:id", ProjectController.getProjectById);
router.get("/get-workxp/:id", ExperienceController.getWorkXpById);
router.get("/get-client/:id", ClientController.getClientById);
router.get("/get-message/:id", ContactController.getMessageById);

// UPDATING ITEMS
router.put("/update-project/:id", ProjectController.updateProject);
router.put("/update-client/:id", ClientController.updateClient);
router.put("/update-work-experience/:id", ExperienceController.updateWorkXP);
// router.put("/update-message/:id", ContactController.updateMessage);

// DELETING ITEMS
router.delete("/delete-project/:id", ProjectController.deleteProject);
router.delete("/delete-client/:id", ClientController.deleteClient);
router.delete("/delete-work-experience/:id", ExperienceController.deleteWorkXP);
router.delete("/delete-message/:id", ContactController.deleteMessage);

module.exports = router;
