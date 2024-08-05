const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const Cors = require("cors");
const app = express();
const routes = require("./routes/index");

const port = process.env.PORT;

app.use(Cors());
app.use(express.json({ limit: "50mb", extended: true }));

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
