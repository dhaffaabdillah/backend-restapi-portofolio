const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = {}
db.mongoose = mongoose;
db.user = require('../models/user.models')
db.role = require('../models/role.models')
db.ROLES = ['user', 'admin', 'moderator']
module.exports = db;