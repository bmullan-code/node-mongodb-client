var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  admin = mongoose.mongo.Admin;  

/* PCF
"VCAP_SERVICES": {
      "user-provided": [
        {
          "name": "cups-mongodb-service",
          "instance_name": "cups-mongodb-service",
          "binding_name": null,
          "credentials": {
            "uri": "mongodb://pcf_6464de6b73c4be80d8be32438c895560:<removed>@192.168.12.8:28000/default?authSource=admin"
          },
          "syslog_drain_url": "",
          "volume_mounts": [],
          "label": "user-provided",
          "tags": []
        }
      ]
    }
*/

var providers = ["user-provided","mlab","mongodb-odb"];

var vcsProvider = function(arr,obj) {
	var p = null;
	arr.forEach(function(a) {
		p = (obj[a] ? a : p);
	})
	return p;
}


// get vcapservices variables if present.
var vcs = process.env.VCAP_SERVICES 
			? JSON.parse(process.env.VCAP_SERVICES) : null;
console.log("vcs",vcs);
// get the provider (mongodb or mlab hosted)
var provider =  vcs ? vcsProvider(providers,vcs) : null;
console.log("provider",provider);
// extract the creds 
var creds = vcs && vcs[provider] && vcs[provider][0] ? vcs[provider][0].credentials : null;
console.log("creds",creds);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

connection = mongoose.createConnection(
	creds ? creds.uri : 'mongodb://localhost');

connection.on('open',function(){
	new admin(connection.db).listDatabases(function(err, result) {
		if (err) {
			console.log("mongodb connection error",err);
		} else {
			console.log('listDatabases succeeded');
			// database list stored in result.databases
			console.log(result.databases);    
		}
	});
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/dbListRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('RESTful API server started on: ' + port);