import axios from "axios";

/**
 * Interface for calling a Rest API to interct with APIs for Readables and Questions
 *
 * TODO: Tighten up this type script with some request and response objects
 */
export default interface RestApi {
  addRecord(
    recordType: string,
    recordData: Record<string, any>
  ): Record<string, any>;
  describeRecords(recordType: string, queryFilter: Record<string, any>): any;
  updateRecord(
    recordType: string,
    recordData: Record<string, any>
  ): Record<string, any>[];
  /**
   * This doesn't really fit, as its not super generic, but it's the current plug
   * for a "server-side" join on Readables and anything related to that Readable (like questions)
   */
  getRecordsForReadble(recordType: string, readableId: string): any;
}

export default class DefaultRestApi implements RestApi {
  conn!: any;
  baseUrl!: string;
  public constructor(baseUrl: string) {
    //Not sure if it's dumb to keep the connection open?
    this.conn = axios.create({
      baseURL: baseUrl,
    });
    this.baseUrl = baseUrl;
    this.addRecord = this.addRecord.bind(this);
    this.describeRecords = this.describeRecords.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.getRecordsForReadble = this.getRecordsForReadble.bind(this);
  }
}
