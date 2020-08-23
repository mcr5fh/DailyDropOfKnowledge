import { ObjectId } from "mongodb";
// DTOs

export interface InsertDocumentResponse {
  readonly insertedCount: number;
  readonly insertedId: ObjectId;
  readonly insertedDocs: object;
}

export interface UpdateDocumentResponse {
  readonly ok?: number;
  readonly updatedDoc: object;
}
