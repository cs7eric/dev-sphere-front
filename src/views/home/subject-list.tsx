import React, {useEffect, useState} from "react";
import {getSceneSubjectPageUsingPost, SubjectInfoDTO} from "@/apis/subject";
import {DynamicTable} from "@/components/tasks/components/dynamic-table.tsx";
import {Subject} from "@/models/subject.types.ts";

// Simulate a database read for tasks.

const subjectData: Subject[] = [
  {
    id: "101",
    subjectName: "React组件生命周期",
    subjectDifficult: 3,
    settleName: "前端框架",
    subjectType: 1,
    subjectScore: 5,
    labelName: ["1", "2"]
  },
  {
    id: "102",
    subjectName: "Vue响应式原理",
    subjectDifficult: 4,
    settleName: "前端框架",
    subjectType: 4,
    subjectScore: 10,
  },
  {
    id: "103",
    subjectName: "CSS盒模型",
    subjectDifficult: 2,
    settleName: "CSS基础",
    subjectType: 2,
    subjectScore: 3,
  }
]

// 题目类型映射
const subjectTypeMap = [
  {label: "单选题", value: 1},
  {label: "多选题", value: 2},
  {label: "判断题", value: 3},
  {label: "简答题", value: 4}
]

type SubjectInfoSchema = {
  id?: number;
  labelName?: string[];
  liked?: boolean;
  nextSubjectId?: number;
  subjectDifficult?: number;
  subjectName?: string;
  subjectScore?: number;
  subjectType?: number;
};

export default function ListPage() {
  const [subjectList, setSubjectList] = useState<SubjectInfoSchema>([])

// 难度级别映射
  const difficultMap = [
    {label: "easy", value: 1},
    {label: "normal", value: 2},
    {label: "medium", value: 3},
    {label: "hard", value: 4},
    {label: "hell", value: 5,}
  ]


  const body: SubjectInfoDTO = {
    pageNo: 1,
    pageSize: 20
  }
  // 自定义渲染器 - 题目
  const subjectRenderers = {
    createdTime: (row: Subject) => (
      <span>{row.createdTime?.toLocaleDateString()}</span>
    ),
    subjectDifficult: (row: Subject) => (
      <span className='p-1.5 rounded-md border'>{row.subjectDifficult == 1 ? 'easy' : 'hard'}</span>
    ),
    subjectType: (row:Subject) => (
      <span>{row.subjectType == 5 ? '场景题' : '面试题'}</span>
    ),
    labelName: (row:Subject) => (
      <div className='space-x-2'>
        {["java", "Spring", "JVM"].map((item) => (
          <span className='p-1.5 rounded-md border'>{item}</span>
        ))}
      </div>

    )

  }


  useEffect(() => {


    const fetchSubjectListData = async () => {
      const res = await getSceneSubjectPageUsingPost({body});
      setSubjectList(res.data.result);
    }

    fetchSubjectListData();
    console.log(subjectList)
  }, [])


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
          excludeFields={["subjectParse", "id", "settleName"]}
          customRenderers={subjectRenderers}
          columnTitles={{
            subjectName: "题目名称",
            labelName: "标签",
            subjectDifficult: "难度级别",
            subjectType: "题目类型",
            subjectScore: "积分",
          }}
          fieldValueMaps={{
            subjectType: subjectTypeMap,
            subjectDifficult: difficultMap,
          }}
          includeFilterFields={["subjectType", "subjectDifficult", "isDeleted"]}
          onRowClick={(row) => console.log("点击了题目:", row.subjectName)}
        />
      </div>
    </>
  )
}
