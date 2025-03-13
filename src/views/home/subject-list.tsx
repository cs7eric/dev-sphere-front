import {columns} from "@/components/tasks/components/columns"
import {DataTable} from "@/components/tasks/components/data-table"
import React, {useEffect, useState} from "react";
import {getSceneSubjectPageUsingPost, SubjectInfoDTO} from "@/apis/subject";
import {Button} from "@/components/ui/button.tsx";
import {addToast} from "@heroui/toast";
import {DynamicTable} from "@/components/tasks/components/dynamic-table.tsx";
import {Subject} from "@/models/subject.types.ts";
import {ArrowDown, ArrowUp, CheckCircle, XCircle} from "lucide-react"

// Simulate a database read for tasks.

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
  {label: "单选题", value: 1},
  {label: "多选题", value: 2},
  {label: "判断题", value: 3},
  {label: "简答题", value: 4}
]


export default function ListPage() {
  const [subjectList, setSubjectList] = useState<SubjectInfoDTO>([])

// 难度级别映射
  const difficultMap = [
    {label: "入门", value: 1, icon: ArrowDown},
    {label: "简单", value: 2, icon: ArrowDown},
    {label: "中等", value: 3},
    {label: "困难", value: 4, icon: ArrowUp},
    {label: "专家", value: 5, icon: ArrowUp}
  ]

  // 删除状态映射
  const deletedMap = [
    {label: "正常", value: 0, icon: CheckCircle},
    {label: "已删除", value: 1, icon: XCircle},
    {label: '已完成', value: 2, icon: XCircle}
  ]


  const body: SubjectInfoDTO = {
    pageNo: 1,
    pageSize: 10
  }
  // 自定义渲染器 - 题目
  const subjectRenderers = {
    createdTime: (row: Subject) => (
      <span>{row.createdTime?.toLocaleDateString()}</span>
    )
  }


  useEffect(() => {
    const fetchSubjectListData = async () => {
      const res = await getSceneSubjectPageUsingPost({body});
      setSubjectList(res.result); // 更新状态为请求到的数据
      console.log(res.result)
    }

    fetchSubjectListData();
  }, []) // 只在组件挂载时调用


  return (
    <>


      <div className="md:hidden">

      </div>


      <div className="hidden w-full flex-1 flex-col space-y-8 px-30 md:flex">

        <DynamicTable
          data={subjectList}
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
    </>
  )
}
