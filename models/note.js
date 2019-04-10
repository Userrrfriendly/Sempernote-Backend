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
    }
    // notebook: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Notebook"
    // },
    // tags: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Tag"
    // },
    // favourites: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Favourite"
    // }
  },
  { timestamps: true }
);

/*
  notebook: Notebook
  tags: Tag
  favourites: Favorite
*/

module.exports = mongoose.model("Note", noteSchema);
