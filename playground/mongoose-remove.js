const { ObjectID } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// Todo.remove({}).then(result => {
//   console.log(result);
// });

// Todo.findOneAndRemove({})

// Todo.findByIdAndRemove()

Todo.findByIdAndRemove("5b66770d6e21d1062c245908").then(todo => {
  console.log("Todo Removed", todo);
});
