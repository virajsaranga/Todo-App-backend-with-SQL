const globalMessage = require("../error/error.messages");
const todoTask = require("../models/todo.model");

exports.createTask = async function (req, res, next) {
  const newTask = new todoTask({
    task_title: req.body.task_title,
    task_status: req.body.task_status,
  });
  try {
    if (!req.body) {
      res.status(400).json({
        code: 400,
        from: "DB",
        status: "BadRequest",
        message: "Content can not be empty!",
      });
    }
    todoTask.create(newTask, (err, data) => {
      if (err) {
        res.status(500).send({
          success: globalMessage.NotSuccess,
          code: globalMessage.ServerCode,
          status: globalMessage.notSuccessStatus,
          message: err.message,
        });
      } else {
        return res.status(200).json({
          success: globalMessage.Success,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          data: data,
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
//get task by id
exports.getTaskById = async function (req, res) {
  try {
    todoTask.getDataById(req.params.id, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: globalMessage.NotSuccess,
          code: globalMessage.BadCode,
          status: globalMessage.BadMessage,
          message: err.message,
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: globalMessage.Success,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          data: data,
          message: "Task are received",
        });
      } else {
        return res.status(200).json({
          success: globalMessage.NotSuccess,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          data: data,
          message: "Task are not found",
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: globalMessage.NotSuccess,
      code: globalMessage.BadCode,
      status: globalMessage.BadMessage,
      message: err.message,
    });
  }
};
//update task
exports.updateTask = async function (req, res) {
  try {
    todoTask.getDataById(req.params.id, async (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          code: 500,
          status: "not success",
          message: "error",
        });
      }
      if (data.length) {
        const updateTask = new todoTask({
          task_title: req.body.task_title || data[0].task_title,
          task_status: req.body.task_status || data[0].task_status,
        });

        todoTask.Update(req.params.id, updateTask, (err, data) => {
          if (err)
            return res.status(500).send({
              success: false,
              code: 500,
              status: "not success",
              message: err.message,
            });
          else {
            return res.status(200).json({
              success: true,
              code: 200,
              status: "success",
              data: data,
              message: "Task are Updated Successfully",
            });
          }
        });
      } else {
        return res.status(200).json({
          success: true,
          code: 200,
          status: "success",
          message: "Task not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({
      success: globalMessage.NotSuccess,
      code: globalMessage.BadCode,
      status: globalMessage.BadMessage,
      message: e.message,
    });
  }
};
//delete task
exports.deleteTask = async function (req, res) {
  try {
    todoTask.delete(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send({
          success: globalMessage.NotSuccess,
          code: globalMessage.ServerCode,
          status: globalMessage.SeverErrorMessage,
          message: err.message,
        });
      }
      if (data.affectedRows === 1) {
        return res.status(200).json({
          success: globalMessage.Success,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          message: "Successfully deleted",
        });
      } else {
        return res.status(200).send({
          success: globalMessage.NotSuccess,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          message: "Task are not found",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({
      success: globalMessage.NotSuccess,
      code: globalMessage.BadCode,
      status: globalMessage.BadMessage,
      message: e.message,
    });
  }
};

//get All tasks

exports.getAllTasks = async function (req, res) {
  try {
    todoTask.getAll((err, data) => {
      if (err) {
        return res.status(500).send({
          success: globalMessage.NotSuccess,
          code: globalMessage.ServerCode,
          status: globalMessage.SeverErrorMessage,
          message: err.message,
        });
      }
      if (data.length) {
        return res.status(200).json({
          success: globalMessage.Success,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          data: data,
          message: "List is received",
        });
      } else {
        return res.status(200).send({
          success: globalMessage.NotSuccess,
          code: globalMessage.SuccessCode,
          status: globalMessage.SuccessStatus,
          data: data,
          message: "List is empty",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({
      success: globalMessage.NotSuccess,
      code: globalMessage.BadCode,
      status: globalMessage.BadMessage,
      message: e.message,
    });
  }
};
