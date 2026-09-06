import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      data: notes,
    });
  } catch (error) {
    console.error("Get notes error:", error);

    return res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Note text cannot be empty",
      });
    }

    const note = await Note.create({
      text: text.trim(),
      userId: req.userId,
    });

    return res.status(201).json({
      data: note,
    });
  } catch (error) {
    console.error("Create note error:", error);

    return res.status(500).json({
      message: "Failed to create note",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Note text cannot be empty",
      });
    }

    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        userId: req.userId,
      },
      {
        text: text.trim(),
      },
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      data: note,
    });
  } catch (error) {
    console.error("Update note error:", error);

    return res.status(500).json({
      message: "Failed to update note",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete note error:", error);

    return res.status(500).json({
      message: "Failed to delete note",
    });
  }
};