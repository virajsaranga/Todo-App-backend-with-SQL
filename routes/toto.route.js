const routes = require("express").Router();

const Tasks = require("../controllers/todo.controllers");

routes.post("/createTask", Tasks.createTask);
routes.put("/updateTask/:id", Tasks.updateTask);
routes.get("/getTaskById/:id", Tasks.getTaskById);
routes.get("/getAllTasks", Tasks.getAllTasks);

module.exports = routes;
