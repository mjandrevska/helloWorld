var all = require('./env/all');
var env = require('./env/'+process.env.NODE_ENV);
var _ = require('lodash');

console.log(_.defaults(env, all));
module.exports = _.defaults(env, all);

