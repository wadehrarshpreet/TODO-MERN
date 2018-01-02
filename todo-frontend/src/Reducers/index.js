import { combineReducers } from 'redux';
import getData from './getData';
const rootReducer = combineReducers({
  userData:getData
});

export default rootReducer;
