import * as React from "react"
import { Circle } from "@/models/circle.types"
import { Subject } from "@/models/subject.types"
import { DynamicTable } from "@/components/tasks/components/dynamic-table"
import { ArrowDown, ArrowUp, CheckCircle, XCircle } from "lucide-react"

// 示例数据 - 圈子
const circleData: Circle[] = [
  {
    id: "1",
    name: "前端开发圈",
    memberCount: 120,
    memberIdList: ["user1", "user2", "user3"],
    intro: "讨论前端开发技术和最佳实践",
    icon: "/icons/frontend.png"
  },
  {
    id: "2",
    name: "后端架构圈",
    memberCount: 85,
    memberIdList: ["user4", "user5"],
    intro: "分享后端架构设计和性能优化经验",
    icon: "/icons/backend.png"
  },
  {
    id: "3",
    name: "UI/UX设计圈",
    memberCount: 64,
    memberIdList: ["user6", "user7", "user8"],
    intro: "探讨用户界面和用户体验设计",
    icon: "/icons/design.png"
  }
]

// 示例数据 - 题目
const subjectData: Subject[] = [
  {
    id: "101",
    subjectName: "React组件生命周期",
    subjectDifficult: 3,
    settleName: "前端框架",
    subjectType: 1,
    subjectScore: 5,
    subjectParse: "React组件有多个生命周期方法...",
    createdBy: "admin",
    createdTime: new Date("2023-01-15"),
    isDeleted: 0
  },
  {
    id: "102",
    subjectName: "Vue响应式原理",
    subjectDifficult: 4,
    settleName: "前端框架",
    subjectType: 4,
    subjectScore: 10,
    subjectParse: "Vue通过Object.defineProperty实现响应式...",
    createdBy: "admin",
    createdTime: new Date("2023-02-20"),
    isDeleted: 0
  },
  {
    id: "103",
    subjectName: "CSS盒模型",
    subjectDifficult: 2,
    settleName: "CSS基础",
    subjectType: 2,
    subjectScore: 3,
    subjectParse: "CSS盒模型包括content、padding、border和margin...",
    createdBy: "teacher1",
    createdTime: new Date("2023-03-10"),
    isDeleted: 0
  }
]

// 题目类型映射
const subjectTypeMap = [
  { label: "单选题", value: 1 },
  { label: "多选题", value: 2 },
  { label: "判断题", value: 3 },
  { label: "简答题", value: 4 }
]

// 难度级别映射
const difficultMap = [
  { label: "入门", value: 1, icon: ArrowDown },
  { label: "简单", value: 2, icon: ArrowDown },
  { label: "中等", value: 3 },
  { label: "困难", value: 4, icon: ArrowUp },
  { label: "专家", value: 5, icon: ArrowUp }
]

// 删除状态映射
const deletedMap = [
  { label: "正常", value: 0, icon: CheckCircle },
  { label: "已删除", value: 1, icon: XCircle },
  {label: '已完成', value: 2, icon: XCircle}
]

export default function DynamicTableExample() {
  // 自定义渲染器 - 圈子
  const circleRenderers = {
    memberIdList: (row: Circle) => (
      <span>{row.memberIdList.length} 位成员</span>
    ),
    icon: (row: Circle) => (
      <img src={row.icon} alt={row.name} className="w-8 h-8 rounded-full" />
    )
  }

  // 自定义渲染器 - 题目
  const subjectRenderers = {
    createdTime: (row: Subject) => (
      <span>{row.createdTime?.toLocaleDateString()}</span>
    )
  }

  return (
    <div className="container mx-auto py-10 space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">圈子数据表格</h2>
        <DynamicTable
          data={circleData}
          exampleObject={circleData[0]}
          filterColumn="name"
          searchPlaceholder="搜索圈子名称..."
          excludeFields={["memberIdList"]}
          customRenderers={circleRenderers}
          columnTitles={{
            id: "ID",
            name: "圈子名称",
            memberCount: "成员数量",
            intro: "简介",
            icon: "图标"
          }}
          onRowClick={(row) => console.log("点击了圈子:", row.name)}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">题目数据表格</h2>
        <DynamicTable
          data={subjectData}
          exampleObject={subjectData[0]}
          filterColumn="subjectName"
          searchPlaceholder="搜索题目..."
          excludeFields={["subjectParse", "updateBy", "updateTime"]}
          customRenderers={subjectRenderers}
          columnTitles={{
            id: "题目ID",
            subjectName: "题目名称",
            subjectDifficult: "难度级别",
            settleName: "分类",
            subjectType: "题目类型",
            subjectScore: "分值",
            createdBy: "创建人",
            createdTime: "创建时间",
            isDeleted: "状态"
          }}
          fieldValueMaps={{
            subjectType: subjectTypeMap,
            subjectDifficult: difficultMap,
            isDeleted: deletedMap
          }}
          includeFilterFields={["subjectType", "subjectDifficult", "isDeleted"]}
          onRowClick={(row) => console.log("点击了题目:", row.subjectName)}
        />
      </div>
    </div>
  )
}