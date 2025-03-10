import type {Circle} from "@/models/circle.types.ts";
import React from "react";
import {Image} from '@unpic/react'

interface Props {
  circle: Circle
}

const CircleItem:React.FC<Props> = ({circle}) => {


  return (
    <>
      <div className="circle-item flex justify-center flex-col p-4">
        <Image
          src={circle.icon}
          width={'100px'}
          height={'100px'}
          className={'rounded-full'}
        ></Image>
        <div className="info-section flex flex-col justify-center items-center">
          <h3 className="font-semibold">Java</h3>
          <span className={'text-neutral-500 text-xs'}>98.2w subscribe</span>
        </div>
      </div>
    </>
  )
}

export default CircleItem