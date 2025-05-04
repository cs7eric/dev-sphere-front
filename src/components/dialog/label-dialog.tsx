import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.tsx";
import {getSubjectListByCategoryUsingPost, getSubjectListByLabelUsingPost} from "@/apis/subject";
import EmptyState from "@/components/null/empty-state.tsx";
import SubjectAbbreviateList from "@/views/subject/components/subject-abbreviate-list.tsx";

interface Props {
  label
}

const LabelDialog: React.FC<Props> = ({ label }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [subjectList, setSubjectList] = useState([]);

  const body = {
    labelId: label.id
  };

  const fetchSubjectListByLabel = async () => {
    const res = await getSubjectListByLabelUsingPost({ body });
    if (res.success && Array.isArray(res.data)) {
      setSubjectList(res.data);
    }
  };

  // 将数据请求移动到 onClick 事件中
  const handleLabelClick = () => {
    setIsOpen(true);
    fetchSubjectListByLabel();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <h3
            className='p-1 hover:rounded-md hover:bg-neutral-800/10 hover:text-neutral-900 dark:hover:bg-[#262626] cursor-pointer'
            key={label.id}
            onClick={handleLabelClick}
          >{label.labelName}</h3>
        </DialogTrigger>
        <DialogContent>
          {label.labelName}
          {
            Array.isArray(subjectList) && subjectList.length > 0 ?
              (
                <>
                  <SubjectAbbreviateList
                    subjectList={subjectList}
                  ></SubjectAbbreviateList>
                </>
              ): (
                <>
                  <EmptyState></EmptyState>
                </>
              )
          }
        </DialogContent>
      </Dialog>

    </>
  )
}

export default LabelDialog;