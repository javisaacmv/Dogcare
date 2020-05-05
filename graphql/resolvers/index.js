const dogResolver = require("./dog");
const authResolver = require("./auth");

const rootResolver = {
  ...dogResolver,
  ...authResolver,
};

module.exports = rootResolver;
