const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const fs = require("fs");
const Dog = require("../../db/models/dog");
const User = require("../../db/models/user");
const path = require("path");

module.exports = {
  dogs: async () => {
    const dogs = await Dog.find();
    return dogs.map((d) => {
      return {
        ...d._doc,
        _id: d.id,
        createdAt: d._doc.createdAt.toString(),
      };
    });
  },
  createDog: (args) => {
    const dog = new Dog({
      ...args.dogInput,
      createdAt: new Date(args.dogInput.createdAt),
    });
    dog
      .save()
      .then((result) => {
        console.log(result);
        return result._doc;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
