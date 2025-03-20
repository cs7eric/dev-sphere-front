import {Card, Tooltip} from "@heroui/react";
import {GoAlertFill} from "react-icons/go";
import {Image} from "@unpic/react";
import {Button} from "@/components/ui/button.tsx";
import {FcLike} from "react-icons/fc";
import {BsStarFill} from "react-icons/bs";
import React from "react";
import {FaShareFromSquare} from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import UserAvatar from '@/assets/user/avatar.jpg'
import {RiUserFollowLine, RiUserUnfollowLine} from "react-icons/ri";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Input} from "@/components/ui/input.tsx";
import {IoIosSend} from "react-icons/io";
import CommentItem from "@/components/article/comment-item.tsx";
import UserAbbreviate from "@/components/user/user-abbreviate.tsx";
import {userAbbreviateInfo} from "@/mock/user.ts";
import UserProfile from "@/views/user/components/UserProfile.tsx";
import ArticleProfile from "@/views/article/components/article-profile.tsx";

export default function ArticleItem() {

  const [isFollowed, setIsFollowed] = React.useState(false);

  return (

    <>
      <Card className="w-full border p-4  rounded-md dark:text-[#f0f6fc]">

        <Dialog>
          <DialogTrigger>
            <div className="cursor-pointer">
              <UserAbbreviate
                user={userAbbreviateInfo}
                isFollowed={true}
                requiredFollow={true}
              ></UserAbbreviate>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] lg:max-w-3xl lg:min-h-[800px] grid grid-cols-2">
            <UserProfile user={userAbbreviateInfo}></UserProfile>
          </DialogContent>
        </Dialog>


        <h3 className="font-bold mt-2">Java 的行业现状</h3>

        <div className="article-detail mt-2 p-1 dark:bg-[#111111] rounded-lg">
          <div className="text-container p-2">
            <p
              className="article text-xs  "> 不是JAVA不行了，国内IT圈的信条，导致这个方向的人太多太多了，而且看某音主播，各大培训班，仍旧一教室一教室的招，供应量太大了！JAVA在互联网领域绝对是大佬的存在，但现在互联网行情已经结束了，哪有什么新APP了！岗位肯定是越来越收缩了，这绝对不是一个增量的市场！而是一个需求不断萎靡的市场！
            </p>
            <div className="read-more mt-6">

              <Dialog>
                <DialogTrigger>
                  <p className="text-xs underline dark:hover:text-[#fff] cursor-pointer">Read more</p>
                </DialogTrigger>
                <DialogContent className='min-w-[1460px] min-h-[850px] grid grid-cols-4'>

                  <ArticleProfile></ArticleProfile>

                </DialogContent>
              </Dialog>


            </div>

          </div>

        </div>
        <div className="button-section mt-5 space-x-2">


          <Tooltip content="like it" size="sm" className="text-xs">
            <Button size="sm" variant={"outline"} className="rounded-xl cursor-pointer">
              <FcLike/>
            </Button>
          </Tooltip>
          <Tooltip content="collect it" size="sm" className="text-xs">

            <Button size="sm" variant={"outline"} className="rounded-xl cursor-pointer">
              <BsStarFill className="fill-amber-300"/>
            </Button>
          </Tooltip>

          <Tooltip content="report it" size="sm" className="text-xs">

            <Button size='sm' variant={"outline"} className={'rounded-xl cursor-pointer'}>
              <GoAlertFill className="fill-red-600"/>
            </Button>
          </Tooltip>

          <Button size='sm' variant={"outline"} className={'rounded-xl cursor-pointer'}>

            <FaShareFromSquare className="fill-blue-300"/>

          </Button>

        </div>
      </Card>
    </>
  )
}