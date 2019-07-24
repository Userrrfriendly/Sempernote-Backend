const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type User {
  _id: ID!
  username: String!
  email: String!
  password: String
  notebooks: [Notebook!]!
  defaultNotebook: Notebook!
  tags: [Tag!]
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
  tags:[Tag]!
}

type Tag {
  _id: ID!
  creator: User!
  tagname: String!
  notes:[Note]!
  favorite: Boolean!
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

input AssignTagInput {
  tagID: String!
  noteID: String!
}

type RootQuery {
    notes: [Note!]
    login(email: String!, password: String!): AuthData!
    userNotes(userId: ID!): [Note!]
    user(userId: ID!): User!
    tag(tagId: ID!): Tag!
}

type RootMutation {
    createNote(noteInput: NoteInput): Note
    deleteNoteForever(noteID: ID!): Note!
    updateNoteBody(noteID: ID!, body:String!): Note!
    renameNote(noteID: ID!, title:String!): Note!
    moveNote(noteID: ID!, notebookID:ID!): Note!
    softDeleteNote(noteID: ID!): Note!
    restoreNote(noteID: ID!): Note!
    noteFavoriteTrue(noteID: ID!): Note!
    noteFavoriteFalse(noteID: ID!): Note!
    createUser(userInput: UserInput): User
    createNotebook(name: String!): Notebook!
    notebookFavoriteTrue(notebookID: ID!):Notebook!
    notebookFavoriteFalse(notebookID: ID!):Notebook!
    notebookRename(notebookID: ID!, name: String!):Notebook!
    notebookDelete(notebookID:ID!): Notebook!
    createTag(tagName:String!): Tag!
    assignTag(assignTagInput: AssignTagInput): Tag!
    unAssignTag(tagID: ID!, noteID: ID!): Tag!
    deleteTag(tagID: ID!): Tag!
    tagFavoriteTrue(tagID: ID!):Tag!
    tagFavoriteFalse(tagID: ID!):Tag!
    renameTag(tagID:ID!,newTagName:String!):Tag!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
