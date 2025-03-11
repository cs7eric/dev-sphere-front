export interface User {
  id: string
  userName?: string
  nickName?: string
  email?: string
  phone?: string
  password?: string
  sex?: 0 | 1 | 2  // 0-未知 1-男 2-女
  avatar?: string
  status?: 0 | 1
  introduce?: string
  extJson?: Record<string, any>
  createdBy?: string
  createdTime?: Date
  updateBy?: string
  updateTime?: Date
  isDeleted?: 0 | 1
}