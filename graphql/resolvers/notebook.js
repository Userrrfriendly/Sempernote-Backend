const Note = require("../../models/note");
const User = require("../../models/user");
const Notebook = require("../../models/notebook");
const { transformNotebooks } = require("./merge");

module.exports = {
  // notebooks: async () => {
  //   try {
  //     const notes = await Note.find();
  //     return notes.map(note => {
  //       return transformNote(note);
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // },

  // userNotes: async args => {
  //   try {
  //     const notes = await Note.find({ creator: args.userId });
  //     return notes.map(note => {
  //       return transformNote(note);
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // },

  createNotebook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const notebook = new Notebook({
      name: args.name,
      // notes: [],
      creator: req.userId
    });

    let createdNotebook;

    try {
      const result = await notebook.save();
      createdNotebook = transformNotebooks(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.notebooks.push(notebook);
      await creator.save();
      return createdNotebook;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // deleteNote: async (args, req) => {
  //   //Do I need to add some logic if someone tries to delete a note that doesn't exist?
  //   if (!req.isAuth) {
  //     throw new Error("Unauthenticated!");
  //   }
  //   try {
  //     const note = await Note.findById(args.noteID).populate("note"); //wtf is populate doing?
  //     const transformedNote = transformNote(note);
  //     await Note.deleteOne({ _id: args.noteID });
  //     return transformedNote;
  //   } catch (err) {
  //     console.log("|note.js - deleteNote|" + err);
  //     throw err;
  //   }
  // }
};
