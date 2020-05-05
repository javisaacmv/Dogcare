const dogResolver = require("./dog");

const rootResolver = {
  ...dogResolver,
};

module.exports = rootResolver;
