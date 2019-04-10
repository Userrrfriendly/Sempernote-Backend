const Event = require("../../models/event");
const User = require("../../models/user");
const Note = require("../../models/note");
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
      createdNotes: notes.bind(this, user._doc.createdNotes)
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

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
