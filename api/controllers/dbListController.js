var mongoose = require('mongoose')
  admin = mongoose.mongo.Admin;  

exports.list_all_databases = function(req,res) {
	
	new admin(connection.db).listDatabases(function(err, result) {
		console.log('listDatabases succeeded');
		// database list stored in result.databases
		console.log(result.databases);    
		res.json(result.databases);
	});
}

exports.list_all_collections = function(req, res) {

	var cNames = [];

	console.log("list_all_collections");

	connection.db.listCollections().toArray(function(err, names) {
	    if (err) {
	        console.log(err);
	        res.send(err);
	    }
	    else {
	        names.forEach(function(e,i,a) {
	            console.log("--->>", e.name);
	            cNames.push(e.name);
	        });
	        res.json(cNames);
	    }
	});

};

