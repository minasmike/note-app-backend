const express = require("express");
const router = express.Router();
const { Note } = require("../models/userModel");
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);
router.post("/", noteController.createNote); //tested WORKING
router.get("/", noteController.getAllNotes); //tested WORKING
router.get("/:id", noteController.getNoteById); //tested WORKING
router.put("/:id", noteController.updateNote); //tested WORKING
router.delete("/:id", noteController.deleteNote); //tested WORKING

module.exports = router;
