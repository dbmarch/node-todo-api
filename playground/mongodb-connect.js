//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

// var obj = new ObjectID();  // if we want an object ID.

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDB server: ", err);
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

    //     db.collection ('Todos').insertOne({
    //         text: 'Something to do',
    //         completed: false
    //     }, (err, result) => {
    //         if (err) {
    //             return console.log ('Unable to insert: ', err);
    //         }
    //         console.log (JSON.stringify(result.ops, undefined, 2));
    //    });

    // db.collection('Users').insertOne ({
    //     name: 'Dave',
    //     age: 50,
    //     location: 'St. Louis'
    // } , (err, result) => {
    //     if (err) {
    //         return console.log ('Unable to add User to DB: ', err);
    //     }

    //     console.log (JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    console.log("git is not tracking files");
    client.close();
  }
);
