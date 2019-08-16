const express = require("express");
const bodyParser = require("body-parser");
//graphqlHttp is an express middleware function,
//that takes incoming requests and funnel them throught graphQL query parser and forward them to the right resolvers
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

//if the user is authenticated(logged in) attaches req.isAuth = true; && req.userId = decodedToken.userId; to the reqest body
app.use(isAuth);

//makes all calls to '/graphql' to be intersepted and handled by exress-graphQL
app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-uwppw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
