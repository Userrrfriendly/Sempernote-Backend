const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");
const noteResolver = require("./note");

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...noteResolver
};

module.exports = rootResolver;
