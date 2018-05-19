'use strict';
module.exports = function(app) {
  var dbList = require('../controllers/dbListController');

  // todoList Routes
  app.route('/databases')
    .get(dbList.list_all_databases);

  app.route('/collections')
    .get(dbList.list_all_collections);

  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};
