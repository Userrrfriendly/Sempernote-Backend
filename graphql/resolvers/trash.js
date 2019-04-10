const Note = require("../../models/note");
// const User = require("../../models/user");

const { transformNote } = require("./merge");

module.exports = {
  trash: async () => {
    try {
      const trashedNotes = await Trash.find();
      return trashedNotes.map(note => {
        return transformNote(note);
      });
    } catch (err) {
      throw err;
    }
  },

  deleteTrashNote: async (args, req) => {
    //Do I need to add some logic if someone tries to delete a note that doesn't exist?
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const note = await Note.findById(args.trashNoteID).populate("note"); //wtf is populate doing?
      const transformedNote = transformNote(note);
      await Trash.deleteOne({ _id: args.trashNoteID });
      return transformedNote;
    } catch (err) {
      console.log("|trash.js - deleteTrash|" + err);
      throw err;
    }
  }
  // createNote: async (args, req) => {
  //   if (!req.isAuth) {
  //     throw new Error("Unauthenticated!");
  //   }

  //   const note = new Note({
  //     title: args.noteInput.title,
  //     body: args.noteInput.body,
  //     creator: req.userId
  //   });

  //   let createdNote;

  //   try {
  //     const result = await note.save();
  //     createdNote = transformNote(result);
  //     const creator = await User.findById(req.userId);

  //     if (!creator) {
  //       throw new Error("User not found.");
  //     }
  //     creator.createdNotes.push(note);
  //     await creator.save();
  //     return createdNote;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // },
};
