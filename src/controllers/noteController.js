const Note = require("../models/noteModel");
const {
  createNoteSchema,
  updateNoteSchema,
} = require("../validations/noteValidation");
// create new note.
const createNote = async (req, res) => {
  try {
    const { error } = createNoteSchema.validate(req.body);
    if (error) {
      console.log("create note req body", req.body);
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    const { title, body, userId } = req.body;
    console.log("reqqqqqq:", req.body);
    const createdNote = await Note.create({ title, body, userId });
    res.status(201).json({ success: true, note: createdNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// get all the notes for the user.
const getAllNotes = async (req, res) => {
  const currentUserId = req.body.userId;
  try {
    console.log("reqqq:", req.body);

    const allNotes = await Note.findAll({ where: { userId: currentUserId } });
    res.status(200).json({ success: true, notes: allNotes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// get a specfic note.
const getNoteById = async (req, res) => {
  const noteId = req.params.id;
  const currentUserId = req.body.userId;

  try {
    const note = await Note.findOne({
      where: { id: noteId, userId: currentUserId },
    });

    if (note) {
      res.status(200).json({ success: true, note });
    } else {
      res.status(404).json({
        success: false,
        error: "Note not found or does not belong to the current user",
      });
    }
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
//update existing note.
const updateNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const { error } = updateNoteSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    const currentUserId = req.body.userId;
    const { title, body } = req.body;
    const note = await Note.findOne({
      where: { id: noteId, userId: currentUserId },
    });
    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found or does not belong to the current user",
      });
    }
    const updatedNote = await note.update({ title, body });
    res
      .status(200)
      .json({ success: true, message: "Note successfully updated" });
  } catch (error) {
    console.error("Error updating note by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// delete a note.
const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  const currentUserId = req.body.userId;

  try {
    console.log("noteId:".noteId);
    console.log("current:", currentUserId);
    const note = await Note.findOne({
      where: { id: noteId, userId: currentUserId },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found or does not belong to the current user",
      });
    }
    await note.destroy();
    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
    // return res.status(204).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
