const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect( 'mongodb://localhost:27017/TodoApp'  , (err, client) => {
    if (err) {
        return console.log ('Unable to connect to MongoDB server: ', err);
    }
    console.log ('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // var obj = new ObjectID('5b610ae64ff454311c35e68c');
    // db.collection('Todos').find(obj).toArray().then((docs)=> {
    //     console.log ('Todos');
    //     console.log (JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log ('unable to fetch the todos ', err);
    // });

    // db.collection('Todos').find().count().then ((count) => {
    //     console.log (`Todos count: ${count}`);
    // }, (err) => {
    //     if (err) {
    //         console.log ('unable to fetch todos');
    //     }
    // });

    db.collection ('Users').find({name: 'Dave'}).count().then((count) => {
        console.log (`Dave Count: ${count}`);
    }, (err) => {
        if (err) {
            console.log ( 'unable to query DB');
        }
    })

    db.collection ('Users').find({name: 'Dave'}).toArray().then((docs) => {
        console.log (JSON.stringify(docs, undefined, 2));
    }, (err) => {
        if (err) {
            console.log ( 'unable to query DB');
        }
    })

    client.close();
});