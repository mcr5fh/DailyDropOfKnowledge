import axios from "axios";
import DefaultRestApi from './RestApi';

const BASE_URL = 'https://9h119qdin3.execute-api.us-east-1.amazonaws.com/dev/'

/**
 * This API will call our API Gateway. The result records from that are nested in the 
 * `data` object
 */
class RestServerApi extends DefaultRestApi {
  public constructor() {
    super(BASE_URL + "v1");
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

  updateRecord(recordType: string, recordData: object) {
    return this.conn.patch("/" + recordType, recordData);

  }

}

export default RestServerApi;
