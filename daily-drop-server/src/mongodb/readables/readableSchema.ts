import { ObjectId } from "mongodb";

export interface Readable {
  readonly title: string;
  readonly author?: string;
  readonly description: string;
  readonly type: string; //could be enum
  readonly _id: string;
  readonly yearPublished?: string;
  // DB stuff
  readonly dateAdded: string;
  readonly lastModified: string;
  readonly creatorId: string;
}

export class DefaultReadable implements Readable {
  title!: string;
  author?: string;
  description!: string;
  type!: string;
  _id!: string;
  yearPublished?: string;
  dateAdded: string;
  lastModified: string;
  creatorId: string;

  public constructor(object: any) {
    this.title = object.title;
    this.author = object.author;
    this.description = object.description;
    this.type = object.type;
    this._id =
      object._id instanceof ObjectId ? object._id : new ObjectId(object._id);
    this.yearPublished = object.yearPublished;
    this.dateAdded = object.dateAdded != undefined ? object.dateAdded :  new Date().toISOString();
    this.lastModified = object.lastModified != undefined ? object.lastModified :  new Date().toISOString();
    this.creatorId = object.creatorId;
  }
}
