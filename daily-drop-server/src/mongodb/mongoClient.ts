// const MongoClient = require("mongodb").MongoClient;
import { MongoClient, Db as MongoDb, ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
//URI is stored in .env file
const MONGO_URI = process.env.MONGO_URI || "UNABLE TO LEAD URI";
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
};

export const QUESTION_COLLECTION_NAME = "questions";
export const TEST_COLLECTION_NAME = "createIndexExample1";

// Initialize connection once
//See https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/mongodb/index.d.ts#L729
//for db commands
var mongodb: MongoDb;
var isConnected = false;

export const connect = function (): Promise<boolean> {
  return new Promise((resolve, error) => {
    MongoClient.connect(MONGO_URI, MONGO_OPTIONS, function (err, database) {
      if (err) error(err);

      mongodb = database.db();
      console.log("Connected to Db");
      isConnected = true;
      resolve(true);
    });
  });
};

connect();

export const isDbConnected = function (): boolean {
  return isConnected;
};

export interface InsertDocumentResponse {
  readonly insertedCount: number;
  readonly insertedId: ObjectId;
  readonly insertedDocs: object;
}

export const findDocument = async function (
  collectionName: string,
  payload: any
): Promise<any> {
  const collection = mongodb.collection(collectionName);
  return await collection.find(payload);
};

export const insertDocument = async function (
  collectionName: string,
  payload: any
): Promise<InsertDocumentResponse> {
  const collection = mongodb.collection(collectionName);
  const result = await collection.insertOne(payload);
  return {
    insertedCount: result.insertedCount,
    insertedId: result.insertedId,
    insertedDocs: result.ops,
  };
};
