// src/store/store.js
import {configureStore} from '@reduxjs/toolkit';
import userInfoReducer from "@/store/features/user/userInfoSlice.ts";
import loaderReducer from "@/store/features/loader/loaderSlice.ts";

const store = configureStore({
  // 合并多个Slice
  reducer: {
    userInfo: userInfoReducer,
    loader: loaderReducer
  }
})

export default store
