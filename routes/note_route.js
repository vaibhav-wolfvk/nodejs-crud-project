const express = require("express");
const noteController = require("../controllers/note.js");
const router = express.Router();

router.get("/notes", noteController.getnotes);
router.get("/notes/:noteId", noteController.getNote);
router.patch("/notes/:noteId", noteController.updateNoteByPatch);
router.post("/notes", noteController.createNote);
router.put("/notes/:noteId", noteController.updateNote);
router.delete("/notes/:noteId", noteController.deleteNote);
module.exports = router;
