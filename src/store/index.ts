// src/store/store.js
import {configureStore} from '@reduxjs/toolkit';
import {userInfoSlice} from "@/store/features/user/userInfoSlice.ts";

const store = configureStore({
  // 合并多个Slice
  reducer: {
    userInfo: userInfoSlice
  }
})

export default store
