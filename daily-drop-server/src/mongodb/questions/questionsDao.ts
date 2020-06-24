import { ObjectId } from "mongodb";
import { Request, Response } from "express";

import { Question, DefaultQuestion } from "./questionsSchema";
import {
  findDocument,
  insertDocument,
  InsertDocumentResponse,
} from "../mongoClient";

const QUESTION_COLLECTION_NAME = "questions";

export const insertQuestion = async function (req: Request, res: Response) {
  const question: Question = new DefaultQuestion(req.body);
  console.log("insertQuestion, ", question);

  const insertResponse: InsertDocumentResponse = await insertDocument(
    QUESTION_COLLECTION_NAME,
    question
  );
  res.send({ insertResponse });
};

export const getQuestion = async function (req: Request, res: Response) {
  const questionId = req.params.question_id;
  const mongoQuery = { _id: new ObjectId(questionId) };
  console.log("getquestion req: ", mongoQuery);

  const documentCursor = await findDocument(
    QUESTION_COLLECTION_NAME,
    mongoQuery
  );
  const question: Question = await documentCursor.next();
  console.log("getquestion resp: ", question);
  res.send({ question });
};

export const getQuestionsForReadable = async function (readableId: ObjectId) {
  const mongoQuery = { readableId };
  console.log("getquestion req: ", mongoQuery);

  const documentCursor = await findDocument(
    QUESTION_COLLECTION_NAME,
    mongoQuery
  );
  return await documentCursor.toArray();
};

export const getAllQuestions = async function (req: Request, res: Response) {
  console.log("getAllQuestions ");

  const questions = await (
    await findDocument(QUESTION_COLLECTION_NAME, {})
  ).toArray();
  console.log(questions);
  res.send({ questions: questions });
};
