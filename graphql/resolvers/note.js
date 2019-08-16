const Note = require("../../models/note");
const User = require("../../models/user");
const Notebook = require("../../models/notebook");

const { transformNote } = require("./merge");

module.exports = {
  //unsafe method doesn't need authentication and returns all notes in DB
  // notes: async () => {
  //   try {
  //     const notes = await Note.find();
  //     return notes.map(note => {
  //       return transformNote(note);
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // },

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
      notebook: args.noteInput.notebook
      // favorite: false
    });

    let createdNote;

    try {
      const result = await note.save();
      createdNote = transformNote(result);
      // const creator = await User.findById(req.userId);
      const notebook = await Notebook.findById(args.noteInput.notebook);

      if (!notebook) {
        throw new Error("notebook not found!");
      }
      notebook.notes.push(note);
      await notebook.save();
      return createdNote;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteNoteForever: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID);
      if (!note.trash) {
        throw new Error("Note is not TRASH! aborting delete");
      }
      const transformedNote = transformNote(note);
      await Note.deleteOne({ _id: args.noteID });
      return transformedNote;
    } catch (err) {
      console.log("|deleteNote|" + err);
      throw err;
    }
  },

  updateNoteBody: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID); //.populate("note");
      note.body = args.body;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|updateNoteBody|" + err);
      throw err;
    }
  },

  renameNote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID); //.populate("note");
      note.title = args.title;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|renamed note|" + err);
      throw err;
    }
  },

  moveNote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID);
      const oldNotebook = await Notebook.findById(note.notebook);
      oldNotebook.notes.pull(args.noteID);
      await oldNotebook.save();
      note.notebook = args.notebookID;
      await note.save();
      const updatedNotebook = await Notebook.findById(args.notebookID);
      updatedNotebook.notes.push(note._id);
      await updatedNotebook.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|moveNote|" + err);
      throw err;
    }
  },

  // DONT FORGET TO UPDATE DELETENOTE!!! (hardDeLete)
  softDeleteNote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID); //.populate("note");
      note.trash = true;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|softDeleteNote|" + err);
      throw err;
    }
  },

  restoreNote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID); //.populate("note");
      note.trash = false;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|restoreNote|" + err);
      throw err;
    }
  },

  noteFavoriteTrue: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID); //.populate("note");
      note.favorite = true;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|noteFavoriteTrue|" + err);
      throw err;
    }
  },

  noteFavoriteFalse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID); //.populate("note");
      note.favorite = false;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|noteFavoriteFalse|" + err);
      throw err;
    }
  }
};
