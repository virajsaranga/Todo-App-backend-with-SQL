const sql = require("../models/dbConnection");

const todoTask = function (data) {
  this.task_title = data.task_title;
  this.task_status = data.task_status;
};
todoTask.create = (newTask, result) => {
  sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, "");
      return;
    } else {
      result("", { id: res.insertId, ...newTask });
    }
  });
};

//delete task
todoTask.delete = (id, result) => {
  sql.query(`DELETE FROM tasks WHERE id ='${id}'`, (err, res) => {
    if (err) {
      result(err, "");
      return;
    }
    if (res) {
      result("", res);
      return;
    }
    result("", "");
  });
};

//getById
todoTask.getDataById = (id, result) => {
  sql.query(`SELECT * FROM tasks WHERE id ='${id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, "");
      return;
    }

    if (res) {
      result("", res);
      return;
    }

    result("", "");
    return;
  });
};

//update task
todoTask.Update = (id, updateTask, result) => {
  sql.query(
    `UPDATE tasks
          SET
          blog_title='${updateTask.blog_title}',  
          blog_body='${updateTask.blog_body}',
          img='${updateTask.img}'
          WHERE id='${id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, "");
        return;
      }

      if (res.affectedRows === 1) {
        result("", { id: id, ...updateTask });
        return;
      }

      result("", "");
      return;
    }
  );
};

//getAll
todoTask.getAll = (result) => {
  sql.query("SELECT * FROM tasks", (err, res) => {
    if (err) {
      result(err, "");
      return;
    }

    if (res.length) {
      result("", res);
      return;
    }
    result("", "");
    return;
  });
};
module.exports = todoTask;
