const Note = require("../../models/note");
const User = require("../../models/user");
const { transformNote } = require("./merge");

module.exports = {
  notes: async () => {
    try {
      const notes = await Note.find();
      return notes.map(note => {
        return transformNote(note);
      });
    } catch (err) {
      throw err;
    }
  },

  userNotes: async args => {
    try {
      const notes = await Note.find({ creator: args.userId });
      return notes.map(note => {
        return transformNote(note);
      });
    } catch (err) {
      throw err;
    }
  },

  createNote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const note = new Note({
      title: args.noteInput.title,
      body: args.noteInput.body,
      creator: req.userId,
      notebook: args.noteInput.notebook,
      isTrash: false
    });

    let createdNote;

    try {
      const result = await note.save();
      createdNote = transformNote(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.notes.push(note);
      await creator.save();
      return createdNote;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteNote: async (args, req) => {
    //Do I need to add some logic if someone tries to delete a note that doesn't exist?
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID).populate("note"); //wtf is populate doing?
      const transformedNote = transformNote(note);
      await Note.deleteOne({ _id: args.noteID });
      return transformedNote;
    } catch (err) {
      console.log("|note.js - deleteNote|" + err);
      throw err;
    }
  }
};
