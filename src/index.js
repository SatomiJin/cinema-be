const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const app = express();
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const timeout = require("connect-timeout");
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(timeout("60s"));
routes(app);

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect DB is success!!!");
  })
  .catch((e) => {
    console.log("ERROR:", e);
  });

app.listen(port, () => {
  console.log(`The server is already running on port ${port}`);
});
