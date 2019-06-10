const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");
const noteResolver = require("./note");
const notebookResolver = require("./notebook");
const userResolver = require("./user");
const tagResolver = require("./tag");

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...noteResolver,
  ...notebookResolver,
  ...userResolver,
  ...tagResolver
};

module.exports = rootResolver;
