const Event = require("../../models/event");
const User = require("../../models/user");
const Note = require("../../models/note");
const Notebook = require("../../models/notebook");
const { dateToString } = require("../../helpers/date");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const notes = async notesIds => {
  try {
    const notes = await Note.find({ _id: { $in: notesIds } });
    return notes.map(note => {
      return transformNote(note);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);

    return {
      ...user._doc,
      _id: user.id,
      password: null,
      createdEvents: events.bind(this, user._doc.createdEvents),
      notes: notes.bind(this, user._doc.notes),
      notebooks: transformNotebooks.bind(this, user._doc.notebooks)
    };
  } catch (err) {
    console.log("|merge.js - user()|" + err);
    throw err;
  }
};

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};

const transformNote = note => {
  return {
    ...note._doc,
    _id: note.id,
    createdAt: dateToString(note._doc.createdAt),
    updatedAt: dateToString(note._doc.updatedAt),
    creator: user.bind(this, note.creator)
  };
};

const transformNotebooks = async notebooksIDS => {
  const notebooks = await Notebook.find({ _id: { $in: notebooksIDS } });
  console.log(notebooks);
  //THEORY map is syncronous and it screws me over (no console.log)
  return notebooks.map(notebook => {
    console.log(notebook._doc);
    return {
      ...notebook._doc,
      _id: notebook.id,
      creator: user.bind(this, notebook._doc.creator),
      notes: notes.bind(this, notebook._doc.notes)
    };
  });
  // const result = await function(notebooks = notebooks) {
  //   console.log(notebooks);
  //   console.log("testsdfdsgfdfas sdf ");
  // let finalResult = [];
  // for (let i = 0; i < notebooksIDS.length; i++) {
  //   finalResult.push({ test: "test" });
  // }
  // return finalResult;
};
// console.log(finalResult);
// return result;

// };

//This transforms a single noteBOOK keep for now just for back up
// const transformNotebook = notebook => {
//   return {
//     ...notebook._doc,
//     _id: notebook.id,
//     creator: user.bind(this, notebook._doc.creator),
//     notes: notes.bind(this, notebook._doc.notes)
//   };
// };

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
exports.transformNote = transformNote;
exports.transformNotebooks = transformNotebooks;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
