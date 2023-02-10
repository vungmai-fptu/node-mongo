const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    collection.insertOne({ "name": "Hamburger", "description": "test" },
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log("After Insert:\n");
            console.log(result.ops);

            collection.find({}).toArray((err, docs) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log("Found:\n");
                console.log(docs);

                db.dropCollection("dishes", (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    client.close();
                });
            });
        });

});
