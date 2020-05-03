const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const dbRun = require("./db/dbconfig");

const app = express();

dbRun();

const events = [];

const { buildSchema } = require("graphql");

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`

      type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
         date : String!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
      }

      type RootQuery {
          events: [Event!]!
      }

      type RootMutation {
        createEvent( eventInput: EventInput!): Event
      }

      schema{
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date().toISOString,
        };
        events.push(event);
        return event;
      },
    },
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("server running");
});
