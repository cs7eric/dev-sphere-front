import React from "react";
import {Image} from "@unpic/react";
import UserAvatar from "@/assets/user/avatar.jpg";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IoIosSend} from "react-icons/io";


const CommentItem = React.FC = () => {

  return (
    <>
      <div className="comment-item mt-6">
        <div className="flex  items-center space-x-2">
          <div className="comment-left">
            <Image
              src={UserAvatar}
              width={'36px'}
              height={'36px'}
              className={'rounded-md bg-neutral-700 p-0.5'}
            ></Image>
          </div>
          <div className="comment-right leading-4">
            <h3 className="comment-username font-semibold text-neutral-500 text-[13px]">Rain</h3>
            <p className='text-[11px]'>这是一条评论测试</p>
          </div>


        </div>
      </div>
    </>
  )


}

export default CommentItem