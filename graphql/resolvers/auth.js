const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const Notebook = require("../../models/notebook");
const Note = require("../../models/note");

const { transformNotebooks } = require("./merge");
// const { userFromMerge } = require("./merge");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        username: args.userInput.username,
        notebooks: []
      });

      await user.save();
      // create a default notebook
      const defaultNotebook = new Notebook({
        name: user.username + "'s Notebook",
        creator: user._id,
        notes: []
      });

      //create a default note
      const defaultNote = new Note({
        title: "Wellcome to SemperNote!",
        body:
          // Default body is a stringified quill delta
          '{"ops":[{"attributes":{"bold":true},"insert":"Thanks "},{"attributes":{"italic":true},"insert":"for "},{"attributes":{"underline":true},"insert":"registering"},{"insert":"! "},{"attributes":{"strike":true},"insert":"Create "},{"insert":"notes, tag them star them edit them and more!\\nlist"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"list"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"list3"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"\\n"}]}',
        creator: user._id,
        notebook: defaultNotebook._id
      });

      await defaultNotebook.notes.push(defaultNote);
      await defaultNotebook.save();
      await defaultNote.save();
      await user.notebooks.push(defaultNotebook.id);
      user.defaultNotebook = defaultNotebook.id;
      await user.save();

      const result = transformNotebooks(user.notebooks);

      return {
        ...user._doc,
        password: null,
        _id: user.id,
        notebooks: result
      };
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_PASSWORD,
      {
        expiresIn: "1h"
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  }
};
