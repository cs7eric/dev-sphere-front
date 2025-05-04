import {SubjectInfoDTO} from "@/apis/subject";
import React from "react";
import {Subject} from "@/models/subject.types.ts";
import {useNavigate} from "react-router-dom";


interface Props {
  
  subject: Subject
}

const SubjectAbbreviate: React.FC<Props> = ({subject}) => {

  const navigate = useNavigate()

  const handleClick = (id) => {
    console.log("点击了题目:", id);
    navigate(`/subject/${id}`); // 跳转到指定路由
  }

  return (
    <>
        <div
          className="subject-abbreviate flex justify-between dark:bg-neutral-900 p-3 rounded-lg transition-transform hover:scale-98 duration-150 cursor-pointer"
          onClick={() => handleClick(subject.id)}
        >
          <section className="left flex flex-col w-full space-y-0.5">
            <h3 className="subject-title text-xs">{subject.subjectName}</h3>
            <div className="subject-data space-x-1.5 text-neutral-400 text-[10px]">
              <span className="subjectScore">{subject.subjectScore} </span>
              <span className="subjectType">{subject.subjectType == 1 ? '简答' : '场景'}</span>
              <span className="subjectDifficult">{subject.subjectDifficult == 1 ? 'easy' : 'hard'} </span>
            </div>
          </section>

        </div>
    </>

  )


}

export default SubjectAbbreviate