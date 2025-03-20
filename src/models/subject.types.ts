export interface Subject {
  labelName: string[];
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

export const mockSubjectList: Subject[] = [
  {
    labelName: ['编程', '算法', '数据结构'],
    id: 'subject-001',
    subjectName: '选择合适的数据结构',
    subjectDifficult: 3,
    settleName: '编程题',
    subjectType: 1, // 单选
    subjectScore: 5,
    subjectParse: '选择适合于快速查找的最佳数据结构。',
    createdBy: 'coder123',
    createdTime: new Date('2023-10-01T12:00:00Z'),
    updateBy: 'coder123',
    updateTime: new Date('2023-10-02T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'JavaScript', '基础'],
    id: 'subject-002',
    subjectName: 'JavaScript 中的闭包',
    subjectDifficult: 2,
    settleName: '编程题',
    subjectType: 2, // 多选
    subjectScore: 10,
    subjectParse: '闭包是 JavaScript 中的一个重要概念，理解它对于掌握 JavaScript 至关重要。',
    createdBy: 'coder456',
    createdTime: new Date('2023-10-05T12:00:00Z'),
    updateBy: 'coder456',
    updateTime: new Date('2023-10-06T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'Python', '高级'],
    id: 'subject-003',
    subjectName: 'Python 中的生成器',
    subjectDifficult: 4,
    settleName: '编程题',
    subjectType: 3, // 判断
    subjectScore: 15,
    subjectParse: '生成器是 Python 中用于生成序列的一个非常有用的工具。',
    createdBy: 'coder789',
    createdTime: new Date('2023-10-10T12:00:00Z'),
    updateBy: 'coder789',
    updateTime: new Date('2023-10-11T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'C++', '基础'],
    id: 'subject-004',
    subjectName: 'C++ 中的类与对象',
    subjectDifficult: 2,
    settleName: '编程题',
    subjectType: 4, // 简答
    subjectScore: 8,
    subjectParse: '了解类与对象是面向对象编程的基础。',
    createdBy: 'coder012',
    createdTime: new Date('2023-10-15T12:00:00Z'),
    updateBy: 'coder012',
    updateTime: new Date('2023-10-16T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', '算法', '数据结构'],
    id: 'subject-001',
    subjectName: '选择合适的数据结构',
    subjectDifficult: 3,
    settleName: '编程题',
    subjectType: 1, // 单选
    subjectScore: 5,
    subjectParse: '选择适合于快速查找的最佳数据结构。',
    createdBy: 'coder123',
    createdTime: new Date('2023-10-01T12:00:00Z'),
    updateBy: 'coder123',
    updateTime: new Date('2023-10-02T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'JavaScript', '基础'],
    id: 'subject-002',
    subjectName: 'JavaScript 中的闭包',
    subjectDifficult: 2,
    settleName: '编程题',
    subjectType: 2, // 多选
    subjectScore: 10,
    subjectParse: '闭包是 JavaScript 中的一个重要概念，理解它对于掌握 JavaScript 至关重要。',
    createdBy: 'coder456',
    createdTime: new Date('2023-10-05T12:00:00Z'),
    updateBy: 'coder456',
    updateTime: new Date('2023-10-06T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'Python', '高级'],
    id: 'subject-003',
    subjectName: 'Python 中的生成器',
    subjectDifficult: 4,
    settleName: '编程题',
    subjectType: 3, // 判断
    subjectScore: 15,
    subjectParse: '生成器是 Python 中用于生成序列的一个非常有用的工具。',
    createdBy: 'coder789',
    createdTime: new Date('2023-10-10T12:00:00Z'),
    updateBy: 'coder789',
    updateTime: new Date('2023-10-11T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'C++', '基础'],
    id: 'subject-004',
    subjectName: 'C++ 中的类与对象',
    subjectDifficult: 2,
    settleName: '编程题',
    subjectType: 4, // 简答
    subjectScore: 8,
    subjectParse: '了解类与对象是面向对象编程的基础。',
    createdBy: 'coder012',
    createdTime: new Date('2023-10-15T12:00:00Z'),
    updateBy: 'coder012',
    updateTime: new Date('2023-10-16T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'Java', '基础'],
    id: 'subject-005',
    subjectName: 'Java 中的异常处理',
    subjectDifficult: 2,
    settleName: '编程题',
    subjectType: 1, // 单选
    subjectScore: 5,
    subjectParse: '了解如何在 Java 中进行异常处理。',
    createdBy: 'coder101',
    createdTime: new Date('2023-10-20T12:00:00Z'),
    updateBy: 'coder101',
    updateTime: new Date('2023-10-21T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'Ruby', '中级'],
    id: 'subject-006',
    subjectName: 'Ruby 中的块和迭代器',
    subjectDifficult: 3,
    settleName: '编程题',
    subjectType: 2, // 多选
    subjectScore: 10,
    subjectParse: '块和迭代器是 Ruby 中的核心特性。',
    createdBy: 'coder202',
    createdTime: new Date('2023-10-22T12:00:00Z'),
    updateBy: 'coder202',
    updateTime: new Date('2023-10-23T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'Go', '高级'],
    id: 'subject-007',
    subjectName: 'Go 中的并发编程',
    subjectDifficult: 4,
    settleName: '编程题',
    subjectType: 3, // 判断
    subjectScore: 15,
    subjectParse: '并发编程是 Go 语言的强项之一。',
    createdBy: 'coder303',
    createdTime: new Date('2023-10-25T12:00:00Z'),
    updateBy: 'coder303',
    updateTime: new Date('2023-10-26T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'SQL', '基础'],
    id: 'subject-008',
    subjectName: 'SQL 查询基础',
    subjectDifficult: 1,
    settleName: '编程题',
    subjectType: 4, // 简答
    subjectScore: 7,
    subjectParse: '掌握 SQL 查询的基本语法。',
    createdBy: 'coder404',
    createdTime: new Date('2023-10-30T12:00:00Z'),
    updateBy: 'coder404',
    updateTime: new Date('2023-10-31T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', 'HTML/CSS', '基础'],
    id: 'subject-009',
    subjectName: 'HTML 的基本结构',
    subjectDifficult: 1,
    settleName: '编程题',
    subjectType: 1, // 单选
    subjectScore: 5,
    subjectParse: '了解 HTML 文档的基本结构。',
    createdBy: 'coder505',
    createdTime: new Date('2023-11-01T12:00:00Z'),
    updateBy: 'coder505',
    updateTime: new Date('2023-11-02T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', '网络', '中级'],
    id: 'subject-010',
    subjectName: 'HTTP 的工作原理',
    subjectDifficult: 3,
    settleName: '编程题',
    subjectType: 2, // 多选
    subjectScore: 10,
    subjectParse: '了解 HTTP 协议的基本工作原理。',
    createdBy: 'coder606',
    createdTime: new Date('2023-11-05T12:00:00Z'),
    updateBy: 'coder606',
    updateTime: new Date('2023-11-06T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', '机器学习', '高级'],
    id: 'subject-011',
    subjectName: '机器学习中的过拟合',
    subjectDifficult: 4,
    settleName: '编程题',
    subjectType: 3, // 判断
    subjectScore: 15,
    subjectParse: '过拟合是机器学习中的一个常见问题。',
    createdBy: 'coder707',
    createdTime: new Date('2023-11-10T12:00:00Z'),
    updateBy: 'coder707',
    updateTime: new Date('2023-11-11T12:00:00Z'),
    isDeleted: 0
  },
  {
    labelName: ['编程', '数据分析', '中级'],
    id: 'subject-012',
    subjectName: '使用 Pandas 进行数据处理',
    subjectDifficult: 3,
    settleName: '编程题',
    subjectType: 4, // 简答
    subjectScore: 12,
    subjectParse: 'Pandas 是 Python 中用于数据分析的强大工具。',
    createdBy: 'coder808',
    createdTime: new Date('2023-11-15T12:00:00Z'),
    updateBy: 'coder808',
    updateTime: new Date('2023-11-16T12:00:00Z'),
    isDeleted: 0
  }
];

