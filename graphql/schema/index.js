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

type User {
  _id: ID!
  email: String!
  password: String
  createdNotes: [Note!]
  notebooks: [Notebook!]
  tags: [Tag!]
  favourites:[Favorite!]
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

type Notebook {
  _id: ID!
  title: String!
  createdAt: String!
  updatedAt: String!
  notes: [Note!]
}

type Tag {
  _id: ID!
  title: String!
  notes: [Note!]
}

type Favorite {
  _id: ID!
  createdAt: String!
  notes: [Note!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}

input UserInput {
  email: String!
  password: String!
}

input NoteInput {
  title: String!
  body: String!
}

type RootQuery {
    notes: [Note!]
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createNote(noteInput: NoteInput): Note
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
