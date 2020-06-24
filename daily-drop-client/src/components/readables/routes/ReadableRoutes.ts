import { Component } from "react";
import QuestionCreate from "../../questions/QuestionCreate";

interface RouteableComponent {
  readonly routePath: string;
}

export const NEW_QUESTION_ROUTE_FORMAT = "/readables/:id/questions/new";
export const NEW_QUESTION_COMPONENT = QuestionCreate;

export class NewQuestionRoute implements RouteableComponent {
    routePath: string;
    public constructor(readableId: string){ 
        this.routePath = NEW_QUESTION_ROUTE_FORMAT.replace(":id", readableId);
    }
}
