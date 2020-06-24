import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import serverless from 'serverless-http';

import * as readablesApi from "../mongodb/readables/readablesDao";
import * as questionsApi from "../mongodb/questions/questionsDao";

import route from "./router";

import dotenv from 'dotenv';
dotenv.config();

const app = express();
// const api = require("./dailydrop.js");

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  route(req, res, () => res.json("Hello world Root!"));
});

app.get("/v1", (req: Request, res: Response) => {
  res.json("Hello v1!");
});

// All the endpoints

/*
 * User Endpoints -- not worried about users yet
 */
//This is going to get all groups, and all songs and users in those groups
// app.get('/v1/users/:user_id/info', api.getUserInfo)
// app.post('/v1/users/:user_id/groups', api.addUserToGroup)
// app.post('/v1/users', api.insertUser)
// app.put('/v1/users/:user_id', api.updateUser)

/*
 * Group Endpoints
 */
app.get("/v1/readables/:readable_id/details", (req: Request, res: Response) =>
  route(req, res, readablesApi.getReadable)
);
app.get("/v1/readables/:readable_id/info", (req: Request, res: Response) =>
  route(req, res, readablesApi.getAllReadableInfo)
);
// app.put("/v1/readables/:readable_id", (req: Request, res: Response) =>
// route(req,res,api.updateReadable));
//TODO: Paginition!
app.get("/v1/readables", (req: Request, res: Response) =>
  route(req, res, readablesApi.getAllReadables)
);
app.post("/v1/readables", (req: Request, res: Response) =>
  route(req, res, readablesApi.insertReadable)
);

/*
 * Question Endpoints
 */
//This is going to include all users and songs in the group
// app.get("/v1/questions/:question_id/info", (req: Request, res: Response) =>
// route(req,res,questionsApi.getAllInfoForQuestion));
// app.put("/v1/questions/:question_id", (req: Request, res: Response) =>
// route(req,res,questionsApi.updateQuestion));
app.get("/v1/questions/:question_id", (req: Request, res: Response) =>
  route(req, res, questionsApi.getQuestion)
);
app.get("/v1/questions", (req: Request, res: Response) =>
  route(req, res, questionsApi.getAllQuestions)
);
app.post("/v1/questions", (req: Request, res: Response) =>
  route(req, res, questionsApi.insertQuestion)
);

app.set("port", process.env.PORT || 3005);

// const server = app.listen(app.get("port"), () => {
//   console.log("App is running on http://localhost:%d", app.get("port"));
// });

module.exports = app;
module.exports.handler = serverless(app);
