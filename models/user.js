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
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ],
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
