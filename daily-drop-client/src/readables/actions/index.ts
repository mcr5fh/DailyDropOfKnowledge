import history from "../../history";

import LocalDb from "../../api/jsonServer";

import { DefaultReadable, Readable } from "../model/ReadableModel";
import ReadableActionType from "./actionTypes";

const localDb = new LocalDb();

/*
/ READABLES
*/

//We want to route the user back to the Stream list
export const createReadable = (formValues: object) => {
    return async (dispatch: any, getState: any) => {
      const { userId } = getState().auth;
      const newReadable: Readable = new DefaultReadable({ ...formValues, creatorId: userId })
      const response = await localDb.addRecord("readables", newReadable);
      console.log(response);
      dispatch({
        type: ReadableActionType.CREATE_READABLE,
        payload: response.data
      });
      history.push("/");
    };
  };
  
  export const describeReadables = (filter: object = {}) => async (dispatch: any) => {
    const response = await localDb.describeRecords("readables", filter);
    console.log("describeReadables resp: ", response);
    dispatch({
      type: ReadableActionType.DESCRIBE_READABLES,
      payload: response
    });
  };
  
  export const getReadable = (id: string) => {
    return async (dispatch: any) => {
      console.log("getReadable query: " + id);
      //TODO: Make this a getRecord
      const response = await localDb.getRecordsForReadble(id);
      console.log("getReadable ACtion " + JSON.stringify(response));
      dispatch({
        type: ReadableActionType.GET_READABLE,
        payload: response.data
      });
    };
  };
  
  export const editReadable = (id: string, formValues: any) => {
    return async (dispatch: any) => {
      //Patch will only update SOME properties, not ALL
      const response = await localDb.updateRecord(`readables`, formValues);
      console.log("editQuestion response: ", response);
      dispatch({
        type: ReadableActionType.EDIT_READABLE,
        payload: response.data.updateResponse.updatedDoc
      });
      history.push("/readables");
    };
  };
  
  // export const deleteStream = id => {
  //   return async dispatch => {
  //     const response = await streams.delete(`/streams/${id}`);
  //     console.log(response);
  //     dispatch({
  //       type: DELETE_STREAM,
  //       payload: id
  //     });
  //   };
  // };
  