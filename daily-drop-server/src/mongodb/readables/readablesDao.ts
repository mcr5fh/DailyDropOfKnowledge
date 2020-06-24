import { ObjectId } from "mongodb";
import { Request, Response } from "express";

import { Readable, DefaultReadable } from "./readableSchema";
import { Question } from "../questions/questionsSchema";
import {
  findDocument,
  insertDocument,
  InsertDocumentResponse,
} from "../mongoClient";

import { getQuestionsForReadable } from "../questions/questionsDao";

const READABLE_COLLECTION_NAME = "readables";

export const getAllReadableInfo = async function (req: Request, res: Response) {
  const readableId = new ObjectId(req.params.readable_id);
  const mongoQuery = { _id: readableId };

  console.log("mongoQuery :", mongoQuery);

  const readableCursor = await findDocument("readables", mongoQuery);
  const readable: Readable = await readableCursor.next();
  const questions: Question[] = await getQuestionsForReadable(readableId);
  // console.log("mongoResp :", response);
  res.send({readable, questions});
};

export const insertReadable = async function (req: Request, res: Response) {
  const readable: Readable = new DefaultReadable(req.body);
  console.log(req);
  console.log(readable);

  const insertResponse: InsertDocumentResponse = await insertDocument(
    READABLE_COLLECTION_NAME,
    readable
  );
  res.send({ insertResponse });
};

export const getReadable = async function (req: Request, res: Response) {
  const readableId = req.params.readable_id;
  const mongoQuery = { _id: new ObjectId(readableId) };
  console.log("getReadable req: ", mongoQuery);

  const documentCursor = await findDocument(
    READABLE_COLLECTION_NAME,
    mongoQuery
  );
  const readable: Readable = await documentCursor.next();
  console.log("getReadable resp: ", readable);
  res.send({ readable });
};

export const getAllReadables = async function (req: Request, res: Response) {
  console.log("getAllReadables ");

  const readables = await (
    await findDocument(READABLE_COLLECTION_NAME, {})
  ).toArray();
  console.log(readables);
  res.send({ readables: readables });
};
