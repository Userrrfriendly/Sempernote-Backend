const User = require("../../models/user");

const { transformNotebooks, transformTags } = require("./merge");
// const { transformNotebooks, transformNote, events, notes } = require("./merge");

module.exports = {
  user: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const user = await User.findById(args.userId);
    return {
      ...user._doc,
      _id: user.id,
      email: user.email,
      // notes: notes.bind(this, user._doc.notes),
      password: null,
      notebooks: transformNotebooks.bind(this, user._doc.notebooks),
      tags: transformTags.bind(this, user._doc.tags)
    };
  }
};
