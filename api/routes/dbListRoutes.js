'use strict';
module.exports = function(app) {
  var dbList = require('../controllers/dbListController');

  app.route('/')
  	.get(dbList.connected);

  app.route('/connected')
  	.get(dbList.connected);

  // todoList Routes
  app.route('/databases')
    .get(dbList.list_all_databases);

  app.route('/collections')
    .get(dbList.list_all_collections);

};
