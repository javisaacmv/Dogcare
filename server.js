const express = require("express");
const bodyParser = require("body-parser");

const dbRun = require("./db/dbconfig");
const dogRoute = require("./routes/dog");

const app = express();

dbRun();

app.use(bodyParser.json());

app.use("/dogs", dogRoute);

app.listen(5000, () => {
  console.log("server running");
});
