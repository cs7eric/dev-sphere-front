import React from "react";
import {Circle} from "@/models/circle.types.ts";
import CircleImage from '@/assets/user/avatar.jpg'
import {Image} from '@unpic/react'
import {Button} from "@/components/ui/button.tsx";

interface Props {
  circle: Circle
}

const CircleAbbreviate: React.FC<Props> = ({circle}) => {

  return (
    <>
      <div className="circle-abbreviate flex items-center text-xs justify-between space-x-3 rounded-base bg-neutral-900 p-2 rounded-sm transition-transform hover:scale-102 duration-250 cursor-pointer">
        <div className="left-content flex space-x-3 items-center  ">
          <div className="circle-image p-0.5 bg-neutral-500 rounded-md">
            <Image
              src={circle.image ? CircleImage : circle.image}
              width="30px"
              height="30px"
              className={'rounded-md'}
            />
          </div>
          <div className="circle-info flex flex-col">
            <div className="circle-name">Java</div>
            <div className="circle-intro">Java programmers' home</div>
          </div>
        </div>

        <div className="function-action">
          <Button
            size={'sm'}
            variant={'ghost'}
          >join</Button>
        </div>
      </div>
    </>
  )

}


export default CircleAbbreviate
