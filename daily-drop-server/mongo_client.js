const MongoClient = require("mongodb").MongoClient;
const USER = "ruiters_rw";
const PWD = "yHYwMMS8naD3jgUB";
const DEFAULT_DB = "test";
const MONGO_URI =
  "mongodb+srv://" +
  user +
  ":" +
  pwd +
  "@cluster0-jbtnk.mongodb.net/" +
  DEFAULT_DB +
  "?retryWrites=true&w=majority";

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true });

const TEST_COLLECTION_NAME = "createIndexExample1";

function findQuery(collection) {}
class LocalMongoClient {
  runQuery(collectionName, collectionCommandCallback) {
    client.connect((err) => {
      if (err) {
        console.log("Something went really wrong: ", err);
      }

      const collection = client.db("test").collection(TEST_COLLECTION_NAME);
      const query = { address: "Park Lane 38" };
      collection("customers")
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
        });
      // perform actions on the collection object
      client.close();
    });
  }
}
