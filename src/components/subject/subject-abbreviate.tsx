import {SubjectInfoDTO} from "@/apis/subject";
import React from "react";
import {Image} from "@unpic/react";
import CircleImage from "@/assets/user/avatar.jpg";
import {Button} from "@/components/ui/button.tsx";

interface Props {
  
  subject: SubjectInfoDTO
}

const SubjectAbbreviate: React.FC<Props> = ({subject}) => {
  
  return (
    <>
      <div className="subject-abbreviate flex items-center text-xs justify-between space-x-3 rounded-base bg-neutral-900 p-2 rounded-sm transition-transform hover:scale-102 duration-250 cursor-pointer">
        <div className="left-content flex space-x-3 items-center  ">
          <div className="subject-image p-0.5 bg-neutral-500 rounded-md">
            <Image
              src={subject.image ? CircleImage : subject.image}
              width="30px"
              height="30px"
              className={'rounded-md'}
            />
          </div>
          <div className="subject-info flex flex-col">
            <div className="subject-name">Java</div>
            <div className="subject-intro">Java programmers' home</div>
          </div>
        </div>

        <div className="function-action">
          <Button
            size={'sm'}
            variant={'outline'}
            className={'font-semibold'}
          >brush</Button>
        </div>
      </div>
    </>
    
  )
  
  
}

export default SubjectAbbreviate