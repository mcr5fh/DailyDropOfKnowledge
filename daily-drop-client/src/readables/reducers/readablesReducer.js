import _ from "lodash";
import ReadableActionType from "../actions/actionTypes";

import { DefaultReadable } from "../model/ReadableModel";

export default (state = {}, action) => {
  switch (action.type) {
    case ReadableActionType.CREATE_READABLE:
      return state;
    case ReadableActionType.GET_READABLE:
    case ReadableActionType.EDIT_READABLE:
      const newState = { ...state };
      console.log("Update reducer payload:", action.payload);

      const newReadable = new DefaultReadable(action.payload);
      newState[newReadable.id] = newReadable;
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
