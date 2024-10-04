import { combineReducers } from '@reduxjs/toolkit';
import auth from './component/Login/store';

// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
