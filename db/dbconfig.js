const mongoose = require("mongoose");

const dbRun = () => {
  const conectionString =
    "mongodb+srv://javisaacmv:R4GIqzI6C4ZaIY7n@cluster0-gmkbr.mongodb.net/gqlAPI?retryWrites=true&w=majority";

  mongoose
    .connect(conectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db conected");
    });
};
module.exports = dbRun;
