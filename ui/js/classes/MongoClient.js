function MongoClient() {
    this.mongo = require('mongodb').MongoClient;
    this.Db = require('mongodb').Db;
    this.connection = null;
    this.dbs = {};
}

MongoClient.prototype.connect = function (connectionObj) {
    var mongo = this.mongo;
    var mongoClient = this;
    return new Promise(function (resolve, reject) {
        var address = connectionObj.url;
        var port = connectionObj.port;

        console.log('Trying connection');
        mongo.connect('mongodb://' + address + ':' + port + '/test', function connectResolve(err, db) {
            if (err) {
                console.log(err);
                reject("Connection Failed");
            } else {
                mongoClient.connection = db;
                resolve();
            }
        });
    });
};

MongoClient.prototype.getDBList = function () {
    var admin = this.connection.admin();
    return new Promise(function (resolve, reject) {
        admin.listDatabases(function listDBResolve(err, dbs) {
            resolve(dbs);
        });
    });
};

MongoClient.prototype.getCollections = function (dbName) {
    var db = this.connection.db(dbName);
    return new Promise(function (resolve, reject) {
        db.collections(function (err, names) {
            if (err) {
                reject(err);
            } else {
              console.log(names);
                resolve(names);
            }
        });
    });
}
