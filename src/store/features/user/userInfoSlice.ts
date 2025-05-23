import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@reduxjs/toolkit'

export interface UserInfo {
  userName?: string
  nickName?: string
  phone?: string
  email?: string
  sex?: string | number
  introduce?: string
  avatar?: string
}
const initialState: UserInfo = {
  userName: '',
  nickName: '',
  phone: '',
  email: '',
  sex: undefined,
  introduce: '',
  avatar: ''
}

// 创建一个 Slice
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userInfo: initialState
  },
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 定义一个加的方法
    saveUserInfo: (state, { payload }) => {
      state.userInfo = { ...state.userInfo, ...payload }
    },
    removeUserInfo : (state) => {
      state.userInfo = {}
    }
  }
})
// 导出方法
export const { saveUserInfo, removeUserInfo } = userInfoSlice.actions
export const selectUserInfo = (state: RootState) => state.userInfo;
// 默认导出
export default userInfoSlice.reducer
