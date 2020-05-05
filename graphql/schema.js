const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
  createdAt: String
}

type RootQuery {
  dogs: [Dog!]!
}

type RootMutation {
  createDog(dogInput: DogInput!): Dog
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
