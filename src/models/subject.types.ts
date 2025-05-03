export interface Option {
  optionId: string;
  optionContent: string;
  isCorrect: boolean;
}

export interface Subject {
  labelName: string[];
  id: string
  subjectName?: string
  subjectDifficult?: number
  settleName?: string
  subjectType?: 1 | 2 | 3 | 4  // 1-单选 2-多选 3-判断 4-简答
  subjectScore?: number
  subjectParse?: string
  options?: Option[];
  referenceAnswer?: string; // 简答题的参考答案
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
    options: [
      { optionId: 'opt-001-A', optionContent: '数组', isCorrect: false },
      { optionId: 'opt-001-B', optionContent: '链表', isCorrect: false },
      { optionId: 'opt-001-C', optionContent: '哈希表', isCorrect: true },
      { optionId: 'opt-001-D', optionContent: '栈', isCorrect: false }
    ],
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
    options: [
      { optionId: 'opt-002-A', optionContent: '闭包可以访问其外部函数的变量', isCorrect: true },
      { optionId: 'opt-002-B', optionContent: '闭包可以帮助实现私有变量', isCorrect: true },
      { optionId: 'opt-002-C', optionContent: '闭包会导致内存泄漏', isCorrect: false },
      { optionId: 'opt-002-D', optionContent: '闭包可以保存外部函数的执行上下文', isCorrect: true }
    ],
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
    options: [
      { optionId: 'opt-003-A', optionContent: '生成器函数使用 yield 关键字而不是 return', isCorrect: true },
      { optionId: 'opt-003-B', optionContent: '生成器一次性生成所有值并存储在内存中', isCorrect: false }
    ],
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
    referenceAnswer: 'C++中的类是用户定义的类型，它是对象的蓝图。类定义了数据和操作数据的方法。对象是类的实例，它占用内存并具有类定义的属性和方法。类通过封装、继承和多态性支持面向对象编程的核心概念。',
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
    options: [
      { optionId: 'opt-005-A', optionContent: 'try-catch-finally', isCorrect: true },
      { optionId: 'opt-005-B', optionContent: 'if-else-endif', isCorrect: false },
      { optionId: 'opt-005-C', optionContent: 'do-while-break', isCorrect: false },
      { optionId: 'opt-005-D', optionContent: 'switch-case-default', isCorrect: false }
    ],
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
    options: [
      { optionId: 'opt-006-A', optionContent: 'Ruby中的块可以使用do...end或{}定义', isCorrect: true },
      { optionId: 'opt-006-B', optionContent: '迭代器是调用块的方法', isCorrect: true },
      { optionId: 'opt-006-C', optionContent: 'Ruby中的块只能接收一个参数', isCorrect: false },
      { optionId: 'opt-006-D', optionContent: 'yield关键字用于调用块', isCorrect: true }
    ],
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
    options: [
      { optionId: 'opt-007-A', optionContent: 'Go语言使用goroutine进行并发编程', isCorrect: true },
      { optionId: 'opt-007-B', optionContent: 'Go语言中的channel不能用于goroutine之间的通信', isCorrect: false }
    ],
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
    referenceAnswer: 'SQL查询基础包括SELECT语句用于从数据库中检索数据，WHERE子句用于过滤记录，ORDER BY用于排序结果，GROUP BY用于分组数据，以及JOIN用于连接多个表。基本语法结构为：SELECT column_name(s) FROM table_name WHERE condition GROUP BY column_name(s) HAVING condition ORDER BY column_name(s) ASC/DESC;',
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
    options: [
      { optionId: 'opt-009-A', optionContent: '<head>, <body>, <footer>', isCorrect: false },
      { optionId: 'opt-009-B', optionContent: '<!DOCTYPE html>, <html>, <head>, <body>', isCorrect: true },
      { optionId: 'opt-009-C', optionContent: '<html>, <css>, <javascript>', isCorrect: false },
      { optionId: 'opt-009-D', optionContent: '<start>, <content>, <end>', isCorrect: false }
    ],
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
    options: [
      { optionId: 'opt-010-A', optionContent: 'HTTP是无状态协议', isCorrect: true },
      { optionId: 'opt-010-B', optionContent: 'HTTP使用TCP作为传输层协议', isCorrect: true },
      { optionId: 'opt-010-C', optionContent: 'HTTP只支持GET和POST两种请求方法', isCorrect: false },
      { optionId: 'opt-010-D', optionContent: 'HTTP响应包含状态码、头部和正文', isCorrect: true }
    ],
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
    options: [
      { optionId: 'opt-011-A', optionContent: '过拟合是指模型在训练数据上表现良好但在测试数据上表现较差', isCorrect: true },
      { optionId: 'opt-011-B', optionContent: '增加训练数据量是解决过拟合的唯一方法', isCorrect: false }
    ],
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
    referenceAnswer: 'Pandas是Python中用于数据分析的库，提供了DataFrame和Series两种主要数据结构。常用功能包括数据读取(read_csv, read_excel)、数据清洗(dropna, fillna)、数据转换(apply, map)、数据筛选(loc, iloc, query)、数据聚合(groupby, pivot_table)和数据可视化等。Pandas能高效处理结构化数据，支持时间序列分析，并能与NumPy、Matplotlib等库无缝集成。',
    createdBy: 'coder808',
    createdTime: new Date('2023-11-15T12:00:00Z'),
    updateBy: 'coder808',
    updateTime: new Date('2023-11-16T12:00:00Z'),
    isDeleted: 0
  }
];

