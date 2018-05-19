'use strict';
module.exports = function(app) {
  var dbList = require('../controllers/dbListController');

  // todoList Routes
  app.route('/databases')
    .get(dbList.list_all_databases);

  app.route('/collections')
    .get(dbList.list_all_collections);

};
