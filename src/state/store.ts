import { configureStore } from '@reduxjs/toolkit';
import slice from './slice';
import userSlice from './userSlice';
import CourseSlice from './CourseSlice';
import modalSlice from './modalSlice';

const store = configureStore({
  reducer: {
    porto: slice,
    user: userSlice,
    course: CourseSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
