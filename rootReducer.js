import { combineReducers } from '@reduxjs/toolkit';
import auth from './component/Login/store';
import RecentCourseData  from './component/HomeScreen/store';

// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  auth,
  RecentCourseData,
});

export default rootReducer;
