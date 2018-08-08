const expect = require("expect");
const request = require("supertest");

const { app } = require("../server");
const { Todo } = require("../models/todo");
const { ObjectID } = require("mongodb");

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var text = "Test Todo";
    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create todo with invalid body data", done => {
    var text = "";
    request(app)
      .post("/todos")
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("Get /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("Get /todos/:id", () => {
  it("should return todo doc", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        // console.log("todo...", res.body.todo);
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("should return 404 if todo not found", done => {
    const myId = new ObjectID();
    request(app)
      .get(`/todos/${myId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 for an invalid object id", done => {
    request(app)
      .get("/todos/123")
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should remove a todo", done => {
    var id = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it("should be removed from the database", done => {
    var id = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        Todo.findById(id).then(todo => {
          expect(todo).toBe(null);
        });
      })
      .end(done);
  });

  it("should be return 404 if todo not found", done => {
    var id = new ObjectID();

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it("should be return 404 if object ID is invalid", done => {
    var id = 123;

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});

describe("PATCH /todos/:id", () => {
  it("should update the todo", done => {
    var id = todos[0]._id.toHexString();
    var todo = {
      text: "Todo was PATCHED!",
      completed: true
    };

    request(app)
      .patch(`/todos/${id}`)
      .send(todo)
      .expect(200)
      .expect(res => {
        // console.log("receiving...", res.body);
        // console.log(typeof res.body.completedAt);
        expect(typeof res.body.todo.completedAt).toBe("number");
        expect(res.body.todo.text).toBe(todo.text);
      })
      .end(done);
  });

  it("should clear the comletedAt when todo is not completed", done => {
    var id = todos[1]._id.toHexString();
    var todo = {
      completed: false
    };
    request(app)
      .patch(`/todos/${id}`)
      .send(todo)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.completedAt).toBeNull();
      })
      .end(done);
  });
});
