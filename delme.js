const express = require("express");
const bodyParser = require("body-parser");

//basically an express middleware function,
//that takes incoming requests and funnel them throught graphQL query parser and forward them to the right resolvers
const { graphqlHttp } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

//with body parser we can parse upcomming json bodies
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    /* buildSchema takes a string as a param that defines our schema &
  converts it to a (Js object?) graphQL schema object.
  -[String!] the '!' means that it will always return a string - it cannot be Null
  -[String!]! the '!' outside [] signals that it will always return a list - cannot return Null
  -createEvent
  */
    schema: buildSchema(`
    schema {
      
    }
    `),
    //rootValue points to a JS obj that has all the resolvers in it
    rootValue: {}
  })
);
// app.get("/", (req, res, next) => {
//   res.send("Hello world");
// });

app.listen("5000");
