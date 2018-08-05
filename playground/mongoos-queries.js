const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// var id = "63b6659d4db62e50e68695931";
// const { ObjectId } = require("mongodb");

// if (!ObjectId.isValid(id)) {
//   Console.log("ID not valid");
// }
// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log("Todos", todos);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log("Todo", todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log("Id not found");
//     }
//     console.log("Todo by Id", todo);
//   })
//   .catch(e => {
//     return console.log(e);
//   });
var userId = "5b63b2c6daa96b41707be7d5";

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log("user not found");
    }
    console.log("Found User", user);
  })
  .catch(e => {
    return console.log(e);
  });
