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
      // console.log(result.body);
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

  deleteNote: async (args, req) => {
    //Do I need to add some logic if someone tries to delete a note that doesn't exist?
    //No logic to delete the reference from the notebook
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
  },

  updateNoteBody: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID).populate("note"); //wtf is populate doing?
      note.body = args.body;
      await note.save();
      const transformedNote = transformNote(note);
      // await Note.deleteOne({ _id: args.noteID });
      return transformedNote;
    } catch (err) {
      console.log("|note resolver - updateNoteBody|" + err);
      throw err;
    }
  },

  renameNote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID).populate("note"); //wtf is populate doing?
      note.title = args.title;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|note resolver - renamed note|" + err);
      throw err;
    }
  },

  moveNote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    // console.log(args);
    try {
      const note = await Note.findById(args.noteID).populate("note"); //wtf is populate doing?
      const oldNotebook = await Notebook.findById(note.notebook).populate(
        "notebook"
      );
      oldNotebook.notes.pull(args.noteID);
      await oldNotebook.save();
      note.notebook = args.notebookID;
      await note.save();
      const updatedNotebook = await Notebook.findById(args.notebookID).populate(
        "notebook"
      );
      updatedNotebook.notes.push(note._id);
      await updatedNotebook.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|note resolver - moveNote|" + err);
      throw err;
    }
  },

  // DONT FORGET TO UPDATE DELETENOTE!!! (hardDeLete)
  softDeleteNote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID).populate("note"); //wtf is populate doing?
      note.trash = true;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|note resolver - renamed note|" + err);
      throw err;
    }
  },

  restoreNote: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID).populate("note"); //wtf is populate doing?
      note.trash = false;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|note resolver - renamed note|" + err);
      throw err;
    }
  },

  noteFavoriteTrue: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID).populate("note"); //wtf is populate doing?
      note.favorite = true;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|note resolver - renamed note|" + err);
      throw err;
    }
  },

  noteFavoriteFalse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.noteID).populate("note"); //wtf is populate doing?
      note.favorite = false;
      await note.save();
      const transformedNote = transformNote(note);
      return transformedNote;
    } catch (err) {
      console.log("|note resolver - renamed note|" + err);
      throw err;
    }
  }
};
