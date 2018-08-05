const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDB server: ", err);
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then ((result) => {
    //     console.log (result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then ((result) => {
    //     console.log (result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: 'Something to do'}).then ((result) => {
    //              console.log (result);
    //          });

    // deleteMany
    db.collection("Todos")
      .deleteMany({ text: "Eat Lunch" })
      .then(result => {
        console.log(result);
      });
    db.collection("Todos")
      .findOneAndDelete(new ObjectID("5b610ae64ff454311c35e68c"))
      .then(result => {
        console.log(result);
      });

    //client.close();
  }
);
