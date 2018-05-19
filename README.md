# node-mongodb-client
A simple nodejs mongodb client.

Barry Mullan (May 2018)

Used for testing a connection to a mongodb database. 

**1. Clone this repository to a directory on your system**

```
$ git clone https://github.com/bmullan-pivotal/node-mongodb-client
$ cd node-mongodb-client
```

**2. Create a mongodb service.** In this example we are using 'cf cups' to create a user provided service which will link to an external mongodb database. Replace the 'uri' element below to the connection string for your database

```
$ cf cups cups-mongodb-service -p '{ "uri" : "mongodb://<user>:<password removed>@192.168.xx.x:28000/default?authSource=admin" }'
```

**3. Edit the manifest.yml file to make any deployment changes**

```
applications:
- name: node-mongodb-client
  disk_quota: 1G
  instances: 1
  memory: 1G
  random-route: true
  services:
  - cups-mongodb-service
  stack: cflinuxfs2
```

**4. Push the app to Pivotal cloud foundry.**

```
$ cf push
```

**5. Review the logs to make sure a connection was made.**

```
$ cf logs node-mongodb-client --recent
```

**6. You can hit the 'collections' endpoint from a web browser or via curl. This will display a list of collections at the configured database.**

```
$ curl https://node-mongodb-client.pcfbeta.io/collections
```


