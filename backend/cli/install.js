var fsUpload = require('../helpers/fs/fs-upload.js');
var config = require('../config/_config.js');
var mongoose = require('mongoose');

console.log("Install script initiated:");
console.log("\\r\\n##################################################\"");
console.log("Step 1/x: Creating folders...");
fsUpload.mkdir('')
    .then(fsUpload.mkdir('/img/posts'))
    .then(fsUpload.mkdir('/img/categories'))
    .then(fsUpload.mkdir('/img/users'))
    .then(mongoose.connect('mongodb://' + config.database.dbServer + '/' + config.database.dbName))
    .catch(function (err) {
        console.log("Error : " + err + "\r\n");
    }
);
console.log("\\r\\n##################################################\"");
console.log("\r\nStep 2/x: Initializing the database...");

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    // console.log('Mongoose default connection open to ' + 'mongodb://' + config.database.dbServer + '/' + config.database.dbName);
    //mongoose.connection.db.dropDatabase().then(function(){console.log("here")});
    //process.exit(0);

    mongoose.connection.db.createCollection('users');
    mongoose.connection.db.createCollection('posts');
    mongoose.connection.db.createCollection('categories');

    CounterModel = require('../models/_models').CounterModel;
    var postCounter = new CounterModel({"_id": "posts", "sequenceValue": 0});
    postCounter.save(function (err) {
        if (err) {
            console.log("Error : " + err + "\r\n");
        }
        var categoryCounter = new CounterModel({"_id": "categories", "sequenceValue": 0});
        categoryCounter.save(function (err) {
            if (err) {
                console.log("Error : " + err + "\r\n");
            }
            var userCounter = new CounterModel({"_id": "users", "sequenceValue": 0});
            userCounter.save(function (err) {
                if (err) {
                    console.log("Error : " + err + "\r\n");
                }
                mongoose.connection.close(function () {
                    console.log("\\r\\n##################################################\"");
                    console.log("All done. :)");
                });
            });
        });
    });
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
   console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    // console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        // console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

