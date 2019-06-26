const authResolver = require("./auth");
const noteResolver = require("./note");
const notebookResolver = require("./notebook");
const userResolver = require("./user");
const tagResolver = require("./tag");

const rootResolver = {
  ...authResolver,
  ...noteResolver,
  ...notebookResolver,
  ...userResolver,
  ...tagResolver
};

module.exports = rootResolver;
