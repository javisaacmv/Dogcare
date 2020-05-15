const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const dbRun = require("./db/dbconfig");
const auth = require("./middleware/auth");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

dbRun();

app.use(bodyParser.json());

//app.use(auth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("server running");
});
