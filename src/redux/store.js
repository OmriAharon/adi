import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers';

const allReducers = combineReducers({ ...reducers });

export default createStore(
  allReducers
);
