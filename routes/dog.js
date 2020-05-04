const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const Dog = require("../db/models/dog");

const dogRoute = graphqlHttp({
  schema: buildSchema(`

      type Dog {
          _id: ID!
          name: String!
          description: String!
          breed: String!
          age: Float!
          location: String!
          veterinary: String
          tempHome: String
          defHome: String
          mainInjury: String
          createdAt: String
          
      }

      input DogInput {
        name: String!
          description: String!
          breed: String!
          age: Float!
          location: String!
          veterinary: String
          tempHome: String
          defHome: String
          mainInjury: String
      }

      type RootQuery {
          dogs: [Dog!]!
      }

      type RootMutation {
        createDog( dogInput: DogInput!): Dog
      }

      schema{
        query: RootQuery
        mutation: RootMutation
      }
    `),
  rootValue: {
    dogs: async () => {
      const dogs = await Dog.find();
      return dogs;
    },
    createDog: (args) => {
      const {
        name,
        description,
        breed,
        age,
        location,
        veterinary,
        tempHome,
        defHome,
        mainInjury,
      } = args.dogInput;
      const dog = new Dog({
        name,
        description,
        breed,
        age,
        location,
        veterinary,
        tempHome,
        defHome,
        mainInjury,
      });
      dog
        .save()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      return dog;
    },
  },
  graphiql: true,
});

module.exports = dogRoute;
