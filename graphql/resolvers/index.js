const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");
const noteResolver = require("./note");
const notebookResolver = require("./notebook");

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...noteResolver,
  ...notebookResolver
};

module.exports = rootResolver;
