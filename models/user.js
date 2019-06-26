const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  notebooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notebook"
    }
  ],
  defaultNotebook: {
    type: Schema.Types.ObjectId,
    ref: "Notebook"
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
