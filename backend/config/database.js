var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Int-Rev_Blog', { useMongoClient: true });
module.exports.mongoose = mongoose;

