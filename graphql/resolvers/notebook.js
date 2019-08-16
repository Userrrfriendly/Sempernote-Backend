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
      const notebook = await Notebook.findById(args.notebookID);
      notebook.favorite = true;
      await notebook.save();
      const transformedNotebook = transformSingleNotebook(notebook);
      return transformedNotebook;
    } catch (err) {
      console.log("| NotebookFavoriteTrue: |" + err);
      throw err;
    }
  },

  notebookFavoriteFalse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const notebook = await Notebook.findById(args.notebookID);
      notebook.favorite = false;
      await notebook.save();
      const transformedNotebook = transformSingleNotebook(notebook);
      return transformedNotebook;
    } catch (err) {
      console.log("|notebookFavoriteFalse: |" + err);
      throw err;
    }
  },

  notebookRename: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const notebook = await Notebook.findById(args.notebookID);
      notebook.name = args.name;
      await notebook.save();
      const transformedNotebook = transformSingleNotebook(notebook);
      return transformedNotebook;
    } catch (err) {
      console.log("|notebookRename: |" + err);
      throw err;
    }
  },

  notebookDelete: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const notebook = await Notebook.findById(args.notebookID);
      const user = await User.findById(req.userId);

      const transformedNotebook = transformSingleNotebook(notebook);
      let notes = [];
      if (args.notebookID == user.defaultNotebook) {
        throw new Error("Cannot Delete Default Notebook!");
      }

      if (notebook.notes.length > 0) {
        await notebook.notes.forEach(note => {
          //looping an array of note IDS
          notes.push(note);
        });
        await Note.updateMany(
          { _id: { $in: notes } },
          { trash: true, notebook: user.defaultNotebook }
        );
        await Notebook.deleteOne({ _id: args.notebookID });
        await Notebook.findByIdAndUpdate(user.defaultNotebook, {
          $push: { notes: notes }
        });
        await User.deleteOne({ notebook: args.notebookID });
      } else {
        await Notebook.deleteOne({ _id: args.notebookID });
        await User.deleteOne({ notebook: args.notebookID });
      }
      return transformedNotebook;
    } catch (err) {
      console.log("|notebookDelete|" + err);
      throw err;
    }
  }
};
