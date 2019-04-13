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
  notes: [Note!]
  favourites:[Note!]
  createdEvents: [Event!]
}

type Note {
  _id: ID!
  title: String!
  body: String!
  createdAt: String!
  updatedAt: String!
  creator: User!
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
  isTrash: Boolean!
}

type RootQuery {
    notes: [Note!]
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
    userNotes(userId: ID!): [Note!]
}

type RootMutation {
    createNote(noteInput: NoteInput): Note
    deleteNote(noteID: ID!): Note!
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
