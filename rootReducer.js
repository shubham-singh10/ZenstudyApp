import { combineReducers } from '@reduxjs/toolkit';
import auth from './component/Login/store';
import RecentCourseData  from './component/HomeScreen/store';
import CourseDetailData  from './component/CourseDetail/store';

// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  auth,
  RecentCourseData,
  CourseDetailData,
});

export default rootReducer;
