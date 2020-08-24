import _ from "lodash";
import ReadableActionType from "../actions/actionTypes";

import { DefaultReadable } from "../model/ReadableModel";

export default (state = {}, action) => {
  switch (action.type) {
    case ReadableActionType.CREATE_READABLE:
      return state;
    case ReadableActionType.GET_READABLE:
      const updatedState = { ...state };
      console.log("Get reducer payload:", action.payload);

      const readable = new DefaultReadable(action.payload.readable);
      console.log("Get reducer new readable:", readable);
      updatedState[readable.id] = readable;
      console.log("Get reducer payload:", action.payload);
      return updatedState;
    case ReadableActionType.EDIT_READABLE:
      const newState = { ...state };
      console.log("Update reducer payload:", action.payload);

      const newReadable = new DefaultReadable(action.payload);
      console.log("Update reducer new readable:", newReadable);
      newState[newReadable.id] = newReadable;
      console.log("Update reducer payload:", action.payload);
      return newState;
    case ReadableActionType.DESCRIBE_READABLES:
      //payload will be an array of streams, but we want to save it as a hash
      console.log("dsec", action.payload);
      //TODO: Don't think we need to map this one
      const readables = action.payload.map((data) => new DefaultReadable(data));
      const readablesMap = _.mapKeys(readables, "id");
      return { ...state, ...readablesMap };
    default:
      return state;
  }
};
