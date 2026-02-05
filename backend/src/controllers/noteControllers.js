import Note from "../models/noteModel.js";
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error("Error fetching notes:", error);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const noteID = req.params.id;
    const note = Note.findById(noteID);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error("Error fetching note by ID:", error);
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title: title, content: content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error("Error creating note:", error);
  }
};

export const updateNote = async (req, res) => {
  try {
    const noteID = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      noteID,
      { title, content },
      { new: true },
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error("Error updating note:", error);
  }
};

export const deleteNote = async(req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error("Error deleting note:", error);
  }
};
