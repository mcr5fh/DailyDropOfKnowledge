import DefaultRestApi from "./RestApi";

const BASE_URL = "http://localhost:3001";

class LocalJsonServerApi extends DefaultRestApi {
  //NOTE: I could still have this as a constructor that takes in a URL
  constructor() {
    super(BASE_URL);
  }

  addRecord(recordType: string, recordData: any) {
    if (recordData.dateAdded == undefined) {
      recordData.dateAdded = new Date().toISOString();
    }
    return this.conn.post("/" + recordType, recordData);
  }

  async describeRecords(recordType: string, queryFilter: Record<string, any>) {
    try {
      const recordData = await this.conn.get("/" + recordType);
      console.log("server: ", recordData);
      return recordData.data;
    } catch (err) {
      console.log("describeRecords err: ", err);
      return [];
    }
  }

  //TODO: this doesn't really fit, but best place for now
  async getRecordsForReadble(readableId: string) {
    try {
      const recordData = await this.conn.get("questions");
      //note: this returns a promise!
      console.log("getRecordsForReadble: recordData:", recordData);

      const filteredData = recordData.data.filter(
        (question: Record<string, any>) => question.readableId === readableId
      );
      console.log("filtered records: ", recordData);
      const res = { data: filteredData };
      recordData.data = filteredData;
      return recordData;
    } catch (err) {
      console.log("describeRecords err: ", err);
      return [];
    }
  }

  updateRecord(recordType: string, recordData: object) {
    return this.conn.patch("/" + recordType, recordData);
  }
}

export default LocalJsonServerApi;
