"use strict";
/**
 * This was a test script to attempt to seed the database from a JSON file. 
 * Didn't work great and can use a lot of work
 */
import { ObjectId } from "mongodb";

import { Readable,DefaultReadable } from "../mongodb/readables/readableSchema";
import { Question, DefaultQuestion } from "../mongodb/questions/questionsSchema";
import {
  findDocument,
  insertDocument,
  InsertDocumentResponse,
  isDbConnected,
  connect
} from "../mongodb/mongoClient";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

const READABLES = "readables";
const QUESTIONS = "questions";

const config = require("../../db.json");
console.log(config);
console.log(config.questions);



// while(!isDbConnected()) {
//   // setTimeout(() =>console.log(isDbConnected()), 1000);
// }
async function seedQuestions() {
  
  if(!isDbConnected()) await connect();

  config.questions.forEach(async (questionData:object) => {
    const question: Question = new DefaultQuestion(questionData);
    const resp = await insertDocument(QUESTIONS, question)
    console.log(resp)
  });

  // const questionData = config.questions[0] ;
  // const question: Question = new DefaultQuestion(questionData);
  // const resp = await insertDocument(QUESTIONS, question)
  // console.log(resp)
  // return;
};

async function seedReadables() {
  
  if(!isDbConnected()) await connect();

  config.readables.forEach(async (data:object) => {
    const readable: Readable = new DefaultReadable(data);
    const resp = await insertDocument(READABLES, readable)
    console.log(resp)
  });

  // const questionData = config.questions[0] ;
  // const question: Question = new DefaultQuestion(questionData);
  // const resp = await insertDocument(QUESTIONS, question)
  // console.log(resp)
  // return;
};


seedQuestions();
// seedReadables();

