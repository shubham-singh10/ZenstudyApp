import { combineReducers } from '@reduxjs/toolkit';
import auth from './component/Login/store';
import RecentCourseData  from './component/HomeScreen/store';
import CourseDetailData  from './component/CourseDetail/store';
import PurchaseCourseDetails  from './component/myCourseScreen/store';
import PurchaseWatchCourseData  from './component/WatchCourse/store';
import Payment  from './component/CourseDetail/store/payment';

// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  auth,
  RecentCourseData,
  CourseDetailData,
  PurchaseCourseDetails,
  PurchaseWatchCourseData,
  Payment,
});

export default rootReducer;
