const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDB server: ", err);
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

    // db.collection ('Todos').findOneAndUpdate(
    //     { _id: new ObjectID('5b61255e4f754f632fa5d069')},
    //     { $set: { completed: true } },
    //     { returnOriginal: false }
    // ).then ( (result)=> {
    //     console.log (result);
    // });

    // db.collection ('Users').findOneAndUpdate (
    //     {name: 'Mike'},
    //     {$set: {name: 'David'}},
    //     {returnOriginal: false}
    // ).then (( result) => {
    //     console.log (result)
    // });

    db.collection("Users")
      .findOneAndUpdate(
        { name: "David" },
        { $inc: { age: 1 } },
        { returnOriginal: false }
      )
      .then(result => {
        console.log(result);
      });

    //    client.close();
  }
);
