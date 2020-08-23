// const MongoClient = require("mongodb").MongoClient;
import {
  MongoClient,
  Db as MongoDb,
  FilterQuery,
  UpdateQuery,
  UpdateWriteOpResult,
  FindAndModifyWriteOpResultObject,
  FindOneAndUpdateOption,
} from "mongodb";
import dotenv from "dotenv";
import {
  InsertDocumentResponse,
  UpdateDocumentResponse,
} from "./mongoClientDto";
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

// By default the mongo client returns the pre-updated doc, but 
// we can pass a flag to return the updated version
const RETURN_UPDATED_DOC: FindOneAndUpdateOption = { returnOriginal: false };

// Initialize connection once
//See https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/mongodb/index.d.ts#L729
//for db commands
var mongodb: MongoDb;
var isConnected = false;

// API

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

export const isDbConnected = function (): boolean {
  return isConnected;
};

export const findDocument = async function (
  collectionName: string,
  payload: any
): Promise<any> {
  if (!isDbConnected()) {
    await connect();
  }
  const collection = mongodb.collection(collectionName);
  return await collection.find(payload);
};

export const updateDocument = async function (
  collectionName: string,
  filterQuery: FilterQuery<any>,
  updateQuery: UpdateQuery<any>
): Promise<UpdateDocumentResponse> {
  if (!isDbConnected()) {
    await connect();
  }
  const collection = mongodb.collection(collectionName);

  const result: FindAndModifyWriteOpResultObject<any> = await collection.findOneAndUpdate(
    filterQuery,
    updateQuery,
    RETURN_UPDATED_DOC
  );
  return {
    ok: result.ok,
    updatedDoc: result.value,
  };
};

export const insertDocument = async function (
  collectionName: string,
  payload: any
): Promise<InsertDocumentResponse> {
  if (!isDbConnected()) {
    await connect();
  }

  const collection = mongodb.collection(collectionName);
  const result = await collection.insertOne(payload);
  return {
    insertedCount: result.insertedCount,
    insertedId: result.insertedId,
    insertedDocs: result.ops,
  };
};
