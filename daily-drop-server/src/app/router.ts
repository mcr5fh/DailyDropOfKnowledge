"use strict";
import { Request, Response } from "express";
import { BadRequestException, BAD_REQUEST_RESPONSE_CODE } from "./exceptions";

export default function route(req: Request, res: Response, func: Function) {
  console.log(req.body);
  try {
    func(req, res);
  } catch (e) {
    if (e instanceof BadRequestException) {
      var errorMessage =
        "Bad User Request. " + e.message + "\n" + e.error.stack;
      console.log(errorMessage);
      res.status(BAD_REQUEST_RESPONSE_CODE);
      res.send(errorMessage);
    } else {
      console.log("Caught internal exception: " + e.message);
      console.log(e.stack);
      res.status(BAD_REQUEST_RESPONSE_CODE);
      res.send("Caught internal exception: " + e.message);
    }
  }
}
