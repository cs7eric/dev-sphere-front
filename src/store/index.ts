// src/store/store.js
import {configureStore} from '@reduxjs/toolkit';
import {userInfoSlice} from "@/store/features/user/userInfoSlice.ts";
import loaderReducer from "@/store/features/loader/loaderSlice.ts";

const store = configureStore({
  // 合并多个Slice
  reducer: {
    userInfo: userInfoSlice,
    loader: loaderReducer
  }
})

export default store
