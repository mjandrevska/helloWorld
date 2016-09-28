var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.db.uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));