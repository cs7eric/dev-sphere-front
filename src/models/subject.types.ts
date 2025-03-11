export interface Subject {
  id: string
  subjectName?: string
  subjectDifficult?: number
  settleName?: string
  subjectType?: 1 | 2 | 3 | 4  // 1-单选 2-多选 3-判断 4-简答
  subjectScore?: number
  subjectParse?: string
  createdBy?: string
  createdTime?: Date
  updateBy?: string
  updateTime?: Date
  isDeleted?: 0 | 1
}