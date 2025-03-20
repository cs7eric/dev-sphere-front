import React from "react";
import {Image} from "@unpic/react";
import CircleImage from "@/assets/user/avatar.jpg";
import {Button} from "@/components/ui/button.tsx";

interface Props {
  article
}

const ArticleAbbreviate: React.FC<Props> = ({article}) => {

  return (
    <>
      <div className="circle-abbreviate flex items-center text-xs justify-between space-x-3 rounded-base bg-neutral-900 p-2 rounded-sm transition-transform hover:scale-102 duration-250 cursor-pointer">
        <div className="left-content flex space-x-3 items-center  ">
          <div className="circle-image p-0.5 bg-neutral-500 rounded-md">
            <Image
              src={article.image ? CircleImage : article.image}
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
            variant={'outline'}
            className={'font-semibold'}
          >join</Button>
        </div>
      </div>
    </>

  )

}


export default ArticleAbbreviate