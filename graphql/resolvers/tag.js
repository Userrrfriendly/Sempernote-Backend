const Tag = require("../../models/tag");
const User = require("../../models/user");
const Note = require("../../models/note");

// const { transformNotebooks } = require("./merge");
// const { transformNotebooks, transformNote, events, notes } = require("./merge");
const { transformTag } = require("./merge");

module.exports = {
  tag: async args => {
    const tag = await Tag.findById(args.tagId);
    return {
      ...tag._doc,
      _id: tag.id,
      tagname: tag.tagname,
      favorite: tag.favorite,
      creator: tag.creator,
      notes: tag.notes
      // notebooks: transformNotebooks.bind(this, user._doc.notebooks)
    };
  },

  createTag: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const creator = await User.findById(req.userId);
    if (!creator) {
      throw new Error("User not found.");
    }
    const tag = new Tag({
      tagname: args.tagName,
      creator: req.userId
    });

    try {
      const result = await tag.save();
      createdTag = transformTag(result);
      creator.tags.push(tag);
      await creator.save();
      return createdTag;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //assignTag
  assignTag: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Unauthenticated!");

      const creator = await User.findById(req.userId);
      if (!creator) throw new Error("User not found.");

      const tag = await Tag.findById(args.assignTagInput.tagID);
      if (!tag) throw new Error("Tag not found.");

      const note = await Note.findById(args.assignTagInput.noteID);
      if (!note) throw new Error("note note found.");
      //Any better way to do it???
      const noteIsTagged = await Tag.findById(args.assignTagInput.tagID).find({
        notes: note._id
      });
      if (noteIsTagged.length > 0) throw new Error("Note is already Tagged");

      tag.notes.push(note);
      await tag.save();
      // creator.tags.push(tag);
      // await creator.save();
      note.tags.push(tag);
      await note.save();
      const result = transformTag(tag);
      return result;
    } catch (err) {
      console.log("|assignTag|" + err);
      throw err;
    }
  },

  unAssignTag: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Unauthenticated!");

      const creator = await User.findById(req.userId);
      if (!creator) throw new Error("User not found.");

      const tag = await Tag.findById(args.tagID);
      if (!tag) throw new Error("Tag not found.");

      const note = await Note.findById(args.noteID);
      if (!note) throw new Error("note note found.");

      const noteIsTagged = await Tag.findById(args.tagID).find({
        notes: note._id
      });
      if (noteIsTagged.length === 0) throw new Error("Note is not Tagged.");

      tag.notes.pull(note);
      await tag.save();
      // creator.tags.pull(tag);
      // await creator.save();
      note.tags.pull(tag);
      await note.save();
      const result = transformTag(tag);
      return result;
    } catch (err) {
      console.log("|unAssignTag|" + err);
      throw err;
    }
  },

  //delteTag
  deleteTag: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Unauthenticated!");

      const creator = await User.findById(req.userId);
      if (!creator) throw new Error("User not found.");

      const tag = await Tag.findById(args.tagID);
      if (!tag) throw new Error("Tag not found.");

      const result = transformTag(tag);

      await Note.updateMany(
        {
          _id: { $in: tag.notes } //query
        },

        {
          $pull: { tags: tag._id } // field:values to update
        },
        {
          // new: true // return updated doc
          // runValidators: true // validate before update
        }
      );

      creator.tags.pull(tag._id);
      await creator.save();
      await Tag.deleteOne({ _id: args.tagID });
      return result;
    } catch (err) {
      console.log("|deleteTag|" + err);
      throw err;
    }
  },

  //starTag
  tagFavoriteTrue: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const tag = await Tag.findById(args.tagID);
      console.log("tag: ");
      console.log(tag);
      tag.favorite = true;
      await tag.save();
      const transformedTag = transformTag(tag);
      return transformedTag;
    } catch (err) {
      console.log("|tag resolver - tagFavoriteTrue|" + err);
      throw err;
    }
  },

  //unstarTag
  tagFavoriteFalse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    try {
      const tag = await Tag.findById(args.tagID);
      tag.favorite = false;
      await tag.save();
      const transformedTag = transformTag(tag);
      return transformedTag;
    } catch (err) {
      console.log("|Tag resolver - tagFavoriteFalse|" + err);
      throw err;
    }
  },

  //Rename Tag
  renameTag: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Unauthenticated!");

      const creator = await User.findById(req.userId);
      if (!creator) throw new Error("User not found.");

      const tag = await Tag.findById(args.tagID);
      if (!tag) throw new Error("Tag not found.");

      tag.tagname = args.newTagName;
      await tag.save();

      const result = transformTag(tag);
      return result;
    } catch (err) {
      console.log("|assignTag|" + err);
      throw err;
    }
  }
};
