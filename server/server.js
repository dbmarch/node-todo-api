var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");
const { ObjectId } = require("mongodb");

var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  //    console.log ('POST /todos');
  //   console.log(req.body);

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      // console.log ('Returning ', todos)
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send("ID not valid");
  }

  Todo.findById(id)
    .then(todo => {
      if (todo) {
        res.send({ todo });
      } else {
        res.status(404).send("not found");
      }
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.listen(3001, () => {
  console.log("Started on port 3001");
});

module.exports = { app };
