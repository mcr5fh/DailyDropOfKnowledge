
// // get a single document
// const getReadableQuery = async function (db, payload: ObjectId) : Promise<Readable>{
//   const collection = db.collection("readables");

//   return await collection.find(payload).next();
// };

// (
//   async function () {
//     let r = await insertReadable(test1);
//     console.log("Final res", r);
//   }
// )();
// async function test() {
//   // let r = await insertReadable(test1);
//   // console.log("Final res", r);
//   // console.log("Final res", r.docs);
//   // console.log("Final res", r.ops);
//   // console.log("Final res", r.insertedCount);
//   // console.log("Final res", r.insertedId);
//   try {
//     let r = await getReadable("5eecb0e16fc9042b5b6e94e6");
//     console.log("Get res", r.docs);
//     console.log("Get res", r.ops);
//     console.log("Get res", r.insertedCount);
//     let red: Readable = await r.next();
//     console.log("Get res", r);
//     console.log("Red1", red);
//     red = await r.next();

//     console.log("Red1", red);
//   } catch (err) {
//     console.log(err);
//   }
// }
// // test();
// console.log("done");




// client.connect(err => {
//   const collection = client.db("test").collection("readables");
//   console.log("connected")
//   // perform actions on the collection object
//   client.close();
// });
// console.log("donedone")

// // Use connect method to connect to the server
// (async function (collectionName, dbFunction) {
//   const client = new MongoClient(MONGO_URI);
//   try {
//     await client.connect();
//     console.log("Connected correctly to server");

//     const db = client.db(DEFAULT_DB);

//     // Insert a single document
//     let r = await db.collection(TEST_COLLECTION_NAME).insertOne({ a: 1 });
//     assert.equal(1, r.insertedCount);
//     console.log("insertOne r: ", r);

//     // Insert multiple documents
//     r = await db
//       .collection(TEST_COLLECTION_NAME)
//       .insertMany([{ a: 2 }, { a: 3 }]);
//     assert.equal(2, r.insertedCount);
//     console.log("insertMany r: ", r);

//     // Modify and return the modified document
//     const col = db.collection(TEST_COLLECTION_NAME);
//     r = await col.find({ a: 1 });
//     console.log("findOne r: ", r);
//     const docs = await col.find({ a: 1 }).limit(2).toArray();
//     console.log("docs: ", docs);
//   } catch (err) {
//     console.log(err.stack);
//   }
//   // Close connection
//   client.close();
// })();
// Use connect method to connect to the server
// const execQuery = async function (collectionQuery: Function, payload:any) {
//   const client = new MongoClient(MONGO_URI);
//   try {
//     await client.connect();
//     console.log("Connected correctly to server");

//     const db = client.db(DEFAULT_DB);

//     const response = await collectionQuery(db, payload);
//     // assert.equal(1, response.insertedCount);
//     // console.log("insertOne r: ", response);
//     return response;
//   } catch (err) {
//     console.log(err.stack);
//   }
//   // Close connection
//   client.close();
// };
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
