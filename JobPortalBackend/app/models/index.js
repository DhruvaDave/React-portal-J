const dbConfig = require("../config/database.config.js.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.movies = require("./GotModel.js.js")(mongoose);

module.exports = db;