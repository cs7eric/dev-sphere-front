import {Avatar, Card, Tooltip} from "@heroui/react";
import {GoAlertFill} from "react-icons/go";
import {Image} from "@unpic/react";
import {Button} from "@/components/ui/button.tsx";
import {FcLike} from "react-icons/fc";
import {BsStarFill} from "react-icons/bs";
import React from "react";
import {FaShareFromSquare} from "react-icons/fa6";

export default function ArticleItem() {


  return (

    <>
      <Card className="w-full border p-4  rounded-md dark:text-[#f0f6fc]">
        <div className="user-info flex gap-2 flex-row">

          <Image
            src="https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250309224114762.png"
            width="40px"
            height="40px"
            className="rounded-sm hover:transform hover:scale-110 cursor-pointer"

          ></Image>
          <div>
            <h3 className="text-sm font-bold cursor-pointer">cccs7 @csq020611@gmail.com</h3>
            <p className="text-xs text-[#828c97]">6 days ago</p>
          </div>

        </div>
        <h3 className="font-bold mt-2">Java 的行业现状</h3>

        <div className="article-detail mt-2 p-1 dark:bg-[#111111] rounded-lg">
          <div className="text-container p-2">
            <p
              className="article text-xs  "> 不是JAVA不行了，国内IT圈的信条，导致这个方向的人太多太多了，而且看某音主播，各大培训班，仍旧一教室一教室的招，供应量太大了！JAVA在互联网领域绝对是大佬的存在，但现在互联网行情已经结束了，哪有什么新APP了！岗位肯定是越来越收缩了，这绝对不是一个增量的市场！而是一个需求不断萎靡的市场！
            </p>
            <div className="read-more mt-6">
              <p className="text-xs underline dark:hover:text-[#fff] cursor-pointer">Read more</p>
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