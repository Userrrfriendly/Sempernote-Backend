const Note = require("../../models/note");
const User = require("../../models/user");
const Notebook = require("../../models/notebook");
const { transformSingleNotebook } = require("./merge");

module.exports = {
  createNotebook: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const creator = await User.findById(req.userId);
    if (!creator) {
      throw new Error("User not found.");
    }

    const notebook = new Notebook({
      name: args.name,
      creator: req.userId
    });

    let createdNotebook;

    try {
      const result = await notebook.save();
      createdNotebook = transformSingleNotebook(result);
      creator.notebooks.push(notebook);
      await creator.save();
      return createdNotebook;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  notebookFavoriteTrue: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const notebook = await Notebook.findById(args.notebookID); //wtf is populate doing?
      console.log("notebook: ");
      console.log(notebook);
      notebook.favorite = true;
      await notebook.save();
      const transformedNotebook = transformSingleNotebook(notebook);
      return transformedNotebook;
    } catch (err) {
      console.log("|notebook - NotebookFavoriteTrue: |" + err);
      throw err;
    }
  },

  notebookFavoriteFalse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const notebook = await Notebook.findById(args.notebookID); //wtf is populate doing?
      console.log("notebook: ");
      console.log(notebook);
      notebook.favorite = false;
      await notebook.save();
      const transformedNotebook = transformSingleNotebook(notebook);
      return transformedNotebook;
    } catch (err) {
      console.log("|notebook - NotebookFavoriteTrue: |" + err);
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
