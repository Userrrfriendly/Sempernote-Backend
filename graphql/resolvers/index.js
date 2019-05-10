const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");
const noteResolver = require("./note");
const notebookResolver = require("./notebook");
const userResolver = require("./user");

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...noteResolver,
  ...notebookResolver,
  ...userResolver
};

module.exports = rootResolver;
