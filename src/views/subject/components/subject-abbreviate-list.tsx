import React from "react";
import {Subject} from "@/models/subject.types.ts";
import SubjectAbbreviate from "@/views/subject/components/subject-abbreviate.tsx";
import {useNavigate} from "react-router-dom";


interface Props {

  subjectList: Subject[]
}

const SubjectAbbreviateList: React.FC<Props> = ({subjectList}) => {



  return (
    <>
      <div className="subject-abbr-list">
        {Array.isArray(subjectList) && subjectList.length > 0 ? (
          subjectList.map((subject) => (
            <SubjectAbbreviate
              key={subject.id}
              subject={subject}
            ></SubjectAbbreviate>
          ))
        ) : (<div>null</div>)}
      </div>
    </>

  )


}

export default SubjectAbbreviateList