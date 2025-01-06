import { combineReducers } from '@reduxjs/toolkit';
import auth from './component/Login/store';
import rauth from './component/SignUp/store';
import RecentCourseData from './component/HomeScreen/store';
import CourseDetailData from './component/CourseDetail/store';
import PurchaseCourseDetails from './component/myCourseScreen/store';
import PurchaseWatchCourseData from './component/WatchCourse/store';
import Payment from './component/CourseDetail/store/payment';
import ProfileData from './component/EditScreen/store';
import Meeting from './component/LiveClass/store';
import OTP from './component/purchaseCheck/store';

// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  auth,
  rauth,
  RecentCourseData,
  CourseDetailData,
  PurchaseCourseDetails,
  PurchaseWatchCourseData,
  Payment,
  ProfileData,
  Meeting,
  OTP,
});

export default rootReducer;
