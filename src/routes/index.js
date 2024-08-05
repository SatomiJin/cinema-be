const UserRouter = require("./UserRouter");

const initWebRoute = (app) => {
  app.use("/api/user", UserRouter);
};

module.exports = initWebRoute;
