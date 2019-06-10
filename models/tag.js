const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tagname: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ],
  favorite: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = mongoose.model("Tag", tagSchema);
