import _ from "lodash";
import {
  CREATE_READABLE,
  DESCRIBE_READABLES,
  GET_READABLE,
  EDIT_READABLE,
} from "../../../actions/types";

import { DefaultReadable } from "../model/ReadableModel";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_READABLE:
      return state;
    case GET_READABLE:
    case EDIT_READABLE:
      const newState = { ...state };
      const newReadable = new DefaultReadable(action.payload.readable);
      newState[newReadable.id] = newReadable;
      return newState;
    case DESCRIBE_READABLES:
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
