const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    notebook: {
      type: Schema.Types.ObjectId,
      ref: "Notebook",
      required: true
    },
    isTrash: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
