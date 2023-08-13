const routes = require("express").Router();

//routes
const taskRouter = require("../routes/toto.route");


//task

routes.use("/task", taskRouter);

module.exports = routes;   