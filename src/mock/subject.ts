import {Subject} from "@/models/subject.types.ts";

export const mockSubject: Subject = {
  labelName: ['编程', '数据结构', '算法'], // 示例标签名称
  id: 'subject-001', // 唯一标识符
  subjectName: '选择合适的数据结构', // 题目名称
  subjectDifficult: 3, // 难度等级
  settleName: '编程题', // 题目类型名称
  subjectType: 1, // 题目类型（1-单选）
  subjectScore: 10, // 题目分数
  subjectParse: '选择适合于快速查找的最佳数据结构。', // 题目解析
  createdBy: 'coder123', // 创建者
  createdTime: new Date('2023-10-01T12:00:00Z'), // 创建时间
  updateBy: 'coder123', // 更新者
  updateTime: new Date('2023-10-02T12:00:00Z'), // 更新时间
  isDeleted: 0 // 是否删除（0-未删除）
};
