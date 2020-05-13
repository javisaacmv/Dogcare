const Dog = require("../../db/models/dog");
const User = require("../../db/models/user");

module.exports = {
  dogs: async () => {
    const dogs = await Dog.find();
    return dogs.map((d) => {
      return {
        ...d._doc,
        _id: d.id,
        createdAt: d._doc.createdAt ? d._doc.createdAt.toISOString() : "",
      };
    });
  },
  createDog: async (args, req) => {
    const dog = new Dog({
      ...args.dogInput,
      createdAt: new Date(args.dogInput.createdAt),
    });
    const result = await dog.save();
    return {
      ...result._doc,
      _id: result.id,
      createdAt: result._doc.createdAt.toISOString(),
    };
  },
};
