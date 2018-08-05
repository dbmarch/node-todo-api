var mongoose = require("mongoose");

mongoose.promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mongodb://localhost:27017/TodoApp"
);

module.export = { mongoose };
