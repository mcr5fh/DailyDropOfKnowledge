import axios from "axios";

interface Database {
  addRecord(recordType: string, recordData: Record<string, any>): Record<string, any>;
  describeRecords(recordType: string, queryFilter: Record<string, any>): any;
  getRecordsForReadble(recordType: string, recordId:string): any;
  updateRecord(recordType: string, recordData: Record<string, any>): Record<string, any>[];
}

const BASE_URL = 'https://9h119qdin3.execute-api.us-east-1.amazonaws.com/dev/'
// Local testing const BASE_URL = 'http://localhost:3005/'

class LocalDb implements Database {
  conn: any;
  public constructor() {
    //Not sure if it's dumb to keep the connection open?
    this.conn = axios.create({
      baseURL: BASE_URL + "v1"
    });
    this.addRecord = this.addRecord.bind(this);
    this.describeRecords = this.describeRecords.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
  }

  addRecord(recordType: string, recordData: object) {
    return this.conn.post("/" + recordType, recordData);
  }

  async describeRecords(recordType: string, queryFilter: Record<string, any>) {
    try {
      const recordData = await this.conn.get("/" + recordType);
      //note: this returns a promise!
      console.log("server: ", recordData)
      return recordData.data[recordType];
    }catch(err) {
      console.log("describeRecords err: ", err)
      return []
    }
  }

  //TODO: this doesn't really fit, but best place for now
  async getRecordsForReadble(recordId: string) {
    try {
      const recordData = await this.conn.get(`readables/${recordId}/info`);
      //note: this returns a promise!
      console.log("getRecordsForReadble: ", recordData)
      return recordData;
    }catch(err) {
      console.log("describeRecords err: ", err)
      return []
    }
  }

  updateRecord(recordType: string, recordData: any) {
    const recordId = recordData.id;
    console.log("Update record : ", recordType, " ", recordId);
    return this.conn.patch(`/${recordType}/${recordId}`, recordData);
  }

}

export default LocalDb;
