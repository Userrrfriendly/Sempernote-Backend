const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}

type User {
  _id: ID!
  username: String!
  email: String!
  password: String
  notebooks: [Notebook!]!
  notes: [Note!]
  favourites:[Note!]
  createdEvents: [Event!]
}

type Notebook {
  _id: ID!
  name: String!
  notes:[Note]!
  creator: User!
  favorite: Boolean!
}

type Note {
  _id: ID!
  title: String!
  body: String!
  notebook: Notebook!
  createdAt: String!
  updatedAt: String!
  creator: User!
  favorite: Boolean!
  trash: Boolean!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  email: String!
  password: String!
  username: String!
}

input NoteInput {
  title: String!
  body: String!
  notebook: String!
}

type RootQuery {
    notes: [Note!]
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
    userNotes(userId: ID!): [Note!]
    user(userId: ID!): User!
}

type RootMutation {
    createNote(noteInput: NoteInput): Note
    deleteNote(noteID: ID!): Note!
    updateNoteBody(noteID: ID!, body:String!): Note!
    renameNote(noteID: ID!, title:String!): Note!
    moveNote(noteID: ID!, notebookID:ID!): Note!
    softDeleteNote(noteID: ID!): Note!
    restoreNote(noteID: ID!): Note!
    noteFavoriteTrue(noteID: ID!): Note!
    noteFavoriteFalse(noteID: ID!): Note!
    createUser(userInput: UserInput): User
    createNotebook(name: String!): Notebook!
    createEvent(eventInput: EventInput): Event
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
