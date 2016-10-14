var  session = require('express-session');
var store = new session.MemoryStore();
module.exports = store;