const Note = require("../models/note_model");

exports.getnotes = async (req, res, next) => {
  try {
    const notes = await Note.find(); //.populate("creator");
    res.status(200).json({
      message: "fetched posts succesfully",
      notes: notes,
    });
    res.send("Hello");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getNote = async (req, res, next) => {
  const noteId = req.body.noteId;

  try {
    const note = await Note.findById(noteId);

    res.status(201).json({
      message: "fetched post succesfully",
      note: note,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createNote = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const note = new Note({
    title: title,
    content: content,
  });
  try {
    await note.save();
    res.status(201).json({
      message: "post created succesfully",
      note: note,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  const noteId = req.body.noteId;
  const title = req.body.title;
  const content = req.body.content;

  try {
    const note = await Note.findById(noteId);
    const result = await note.update({ title: title, content: content });
    res.status(201).json({
      message: "post updated succesfully",
      note: note,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateNoteByPatch = async (req, res, next) => {
  const noteId = req.body.noteId;
  const title = req.body.title;
  //const content = req.body.content;

  try {
    const note = await Note.findByIdAndUpdate(noteId, req.body, { new: true });
    res.status(201).json({
      message: "post updated succesfully",
      note: note,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  const noteId = req.body.noteId;

  try {
    await Note.findByIdAndDelete(noteId);

    res.status(201).json({
      message: "post deleted succesfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
