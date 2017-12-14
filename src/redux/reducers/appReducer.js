import * as Immutable from 'seamless-immutable';
import { SET_LANGUAGE } from "../ActionNames";

const appReducer = (state = Immutable.from({}), action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return state.merge({ language: action.payload.language });
    default:
      return state;
  }
};

export default appReducer;
