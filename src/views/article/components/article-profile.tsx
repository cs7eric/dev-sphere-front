import React from "react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Tooltip} from "@heroui/react";
import {Button} from "@/components/ui/button.tsx";
import {FcLike} from "react-icons/fc";
import {BsStarFill} from "react-icons/bs";
import {GoAlertFill} from "react-icons/go";
import {FaShareFromSquare} from "react-icons/fa6";
import {Image} from "@unpic/react";
import UserAvatar from "@/assets/user/avatar.jpg";
import CommentItem from "@/components/article/comment-item.tsx";
import {Input} from "@/components/ui/input.tsx";
import {IoIosSend} from "react-icons/io";
import UserAbbreviate from "@/components/user/user-abbreviate.tsx";
import {userAbbreviateInfo} from "@/mock/user.ts";
import MDEditor from "@uiw/react-md-editor";


interface Props {
  article
}


const ArticleProfile: React.FC<Props> = ({article}) => {

  const text = "送\n" +
    "```\n" +
    "public void static \n" +
    "\n" +
    "```\n" +
    "ss \n" +
    "| Header | Header |\n" +
    "|--------|--------|\n" +
    "| Cesssll | Cell |\n" +
    "| Cdadell | Cell |\n" +
    "| Cell | Cell |\n" +
    "\n" +
    "- sss\n" +
    "- adsa adas\n" +
    "- \n" +
    "\n" +
    "- [ ] da\n" +
    "- [ ] \n" +
    "- [ ] \n" +
    "\n" +
    "1.  sdad\n" +
    "2. asdad"

  return (
    <>
        <section className="left border-r flex flex-col justify-between space-y-4 col-span-3">
          <div className="article-content space-y-3 pr-2">
            <div className="article-title">
              <h3 className="article-title font-bold text-lg">
                {article.title}
              </h3>
            </div>
            <div className="label-list space-x-3 text-xs">
              <span className="label p-1 border rounded-md bg-neutral-600 text-neutral-200">Java</span>
              <span className="label p-1 border rounded-md bg-neutral-600 text-neutral-200">Spring</span>
              <span className="label p-1 border rounded-md bg-neutral-600 text-neutral-200">SpringCloud</span>
            </div>
            <div className="article-data text-xs space-x-3 flex">
              <div className="data-item text-neutral-500 ">
                <span>发布于 一天前</span>
              </div>
              <div className="data-item text-neutral-500">
                14k likes
              </div>
              <div className="data-item text-neutral-500">
                2k collected
              </div>
              <div className="data-item text-neutral-500">
                0.2k commended
              </div>
            </div>
            <ScrollArea className='max-w-[1380px] h-[650px]'>
              <MDEditor.Markdown
                className='text-sm text-neutral-300 leading-8'
                source={article.content}
                style={{
                  background: "#0a0a0a",
                  padding: "16px",
                  borderRadius: "8px",
                  "& pre": {
                    background: "#282c34 !important", // 代码块背景色
                    color: "#abb2bf !important",      // 代码文字颜色
                    padding: "16px",
                    borderRadius: "6px"
                  }
              }}
              />

            </ScrollArea>
          </div>
          <div className="article-function space-x-3">
            <Tooltip content="like it" size="sm" className="text-xs">
              <Button size="sm" variant={"outline"} className="rounded-md cursor-pointer">
                <FcLike className='fill-neutral-50'/>
              </Button>
            </Tooltip>
            <Tooltip content="collect it" size="sm" className="text-xs">

              <Button size="sm" variant={"outline"} className="rounded-md cursor-pointer">
                <BsStarFill className=""/>
              </Button>
            </Tooltip>

            <Tooltip content="report it" size="sm" className="text-xs">

              <Button size='sm' variant={"outline"} className={'rounded-md cursor-pointer'}>
                <GoAlertFill/>
              </Button>
            </Tooltip>

            <Button size='sm' variant={"outline"} className={'rounded-md cursor-pointer'}>

              <FaShareFromSquare className=""/>

            </Button>
          </div>
        </section>
        <section className="right col-span-1 space-y-4 relative">
          <div className="author-info">
            <UserAbbreviate
              user={userAbbreviateInfo}
              isFollowed={true}
              requiredFollow={true}
            ></UserAbbreviate>


          </div>
          <div className="article-outline text-xs leading-7 min-h-[180px]">
            <p> {article.articleAbstract} </p>
          </div>
          <div className="comment-area border-t pt-3">
            <span className='text-xs text-neutral-600'>共 87 条 评论</span>
            <ScrollArea className='h-[460px]'>
              <CommentItem></CommentItem>
              <CommentItem></CommentItem>
              <CommentItem></CommentItem>
              <CommentItem></CommentItem>
              <CommentItem></CommentItem>
              <CommentItem></CommentItem>
              <CommentItem></CommentItem>

            </ScrollArea>
          </div>
          <div className="flex w-full absolute border-t pt-3 bottom-1 left-0 right-0 max-w-sm items-center space-x-2">
            <Image
              src={UserAvatar}
              width={'36px'}
              height={'36px'}
              className={'rounded-md bg-neutral-700 p-0.5'}
            ></Image>
            <Input type="text" placeholder="talk about it" className='bg-[#1b1b1b] text-neutral-400'/>
            <Button type="submit" className='w-[36px] cursor-pointer' variant='outline'><IoIosSend/></Button>
          </div>
        </section>



    </>
  )
}

export default ArticleProfile