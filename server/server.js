require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { ObjectId } = require("mongodb");

const port = process.env.PORT || 3001;

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

app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send("Invalid ID");
  }
  // console.log("removing id", id);
  Todo.findByIdAndRemove(id).then(todo => {
    //console.log("Todo Removed", todo);
    if (!todo) {
      return res.status(404).send("Not Found");
    }
    //console.log("todo deleted");
    res.send({ todo });
  });
});

app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  // console.log("PATCH", id);
  // console.log("body..", body);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      // console.log("sending...", todo);
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// POST /users
app.post("/users", (req, res) => {
  console.log("POST /users");
  console.log(req.body);
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);

  user
    .save()
    .then(user => {
      console.log(user);
      res.send(user);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
