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
  createNote: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated!");
    // }

    const note = new Note({
      title: args.noteInput.title,
      body: args.noteInput.body,
      createdAt: new Date(args.noteInput.createdAt),
      updatedAt: new Date(args.noteInput.updatedAt),
      creator: req.userId
    });
    let createdNote;

    try {
      const result = await note.save();
      createdNote = transformNote(result);
      const creator = await User.findById(req.userId);
      // console.log("kreator: " + creator);
      // console.log("note: " + note);

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdNotes.push(note);
      await creator.save();
      return createdNote;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
