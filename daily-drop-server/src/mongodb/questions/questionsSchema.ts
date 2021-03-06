import { ObjectId } from "mongodb";

export interface Question {
  readonly chapter: string;
  readonly question: string;
  readonly answer: string;
  readonly dateAdded: string;
  readonly creatorId: string;
  readonly _id: ObjectId;
  readonly readableId: string; //for now
}

export class DefaultQuestion implements Question {
  chapter: string;
  question: string;
  answer: string;
  creatorId: string;
  dateAdded: string;
  _id: ObjectId;
  readableId: string;

  public constructor(object: any) {
    this.chapter = object.chapter;
    this.question = object.question;
    this.answer = object.answer;
    this.dateAdded = object.dateAdded;
    this.creatorId = object.creatorId;
    this._id =
      object._id instanceof ObjectId ? object._id : new ObjectId(object._id);
    this.readableId =
      object.readableId instanceof ObjectId
        ? object.readableId
        : new ObjectId(object.readableId);
    this.dateAdded = object.dateAdded
      ? object.dateAdded
      : new Date().toISOString();
  }
}
