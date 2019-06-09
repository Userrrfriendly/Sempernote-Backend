const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteBookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  favorite: {
    type: Boolean,
    default: false,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

module.exports = mongoose.model("Notebook", noteBookSchema);
