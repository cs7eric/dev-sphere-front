import {columns} from "@/components/tasks/components/columns"
import {DataTable} from "@/components/tasks/components/data-table"
import React, {useEffect, useState} from "react";
import {getSceneSubjectPageUsingPost, SubjectInfoDTO} from "@/apis/subject";
import {Button} from "@/components/ui/button.tsx";
import {addToast} from "@heroui/toast";

// Simulate a database read for tasks.

export default function ListPage() {
  const [subjectList, setSubjectList] = useState<SubjectInfoDTO>([])

  const body: SubjectInfoDTO = {
    pageNo: 1,
    pageSize: 10
  }




  useEffect(() => {
    const fetchSubjectListData = async () => {
      const res = await getSceneSubjectPageUsingPost({body});
      setSubjectList(res.data); // 更新状态为请求到的数据

    }

    fetchSubjectListData();
  }, []) // 只在组件挂载时调用


  return (
    <>


      <div className="md:hidden">

      </div>


      <div className="hidden w-full flex-1 flex-col space-y-8 px-30 md:flex">

        <DataTable data={subjectList} columns={columns}/>
      </div>
    </>
  )
}
