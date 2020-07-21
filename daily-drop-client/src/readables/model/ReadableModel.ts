
export interface Readable {
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly type: string; //could be enum
  readonly id: any;
  readonly creatorId: any;
  readonly yearPublished?: string;
  readonly dateAdded?: string;
}

export class DefaultReadable implements Readable {
  title!: string;
  author!: string;
  description!: string;
  type!: string;
  id!: any;
  creatorId!: any;
  yearPublished?: string | undefined;
  dateAdded?: string;

  public constructor (object: any) {
    this.title = object.title;
    this.author = object.author;
    this.description = object.description;
    this.type = object.type;
    this.creatorId = object.creatorId;
    //TODO: Sort this out 
    this.id = object._id ? object._id : object.id;
    this.yearPublished = object.yearPublished;
    this.dateAdded = object.dateAdded;
  }

};
