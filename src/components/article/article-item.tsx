import {Card, Tooltip} from "@heroui/react";
import {GoAlertFill} from "react-icons/go";
import {Button} from "@/components/ui/button.tsx";
import {FcLike} from "react-icons/fc";
import {BsStarFill} from "react-icons/bs";
import React, {useState} from "react";
import {FaShareFromSquare} from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import UserAbbreviate from "@/components/user/user-abbreviate.tsx";
import {userAbbreviateInfo} from "@/mock/user.ts";
import UserProfile from "@/views/user/components/UserProfile.tsx";
import ArticleProfile from "@/views/article/components/article-profile.tsx";
import truncateText from "@/utils/text.ts";
import MDEditor from "@uiw/react-md-editor";
import mdToPlainText from "@/utils/text.ts";


interface Props {
  article
}
const ArticleItem:React.FC<Props> = ({article}) => {

  const [isFollowed, setIsFollowed] = React.useState(false);

  const [isUserOpen, setIsUserOpen] =useState(false)
  const [isArticleOpen, setIsArticleOpen] =useState(false)

  return (

    <>
      <Card className="w-full border p-4  rounded-md dark:text-[#f0f6fc]">

        <Dialog open={isUserOpen} onOpenChange={setIsUserOpen}>
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


        <h3 className="font-bold mt-2">{article.title}</h3>

        <div className="article-detail mt-2 p-1 dark:bg-[#111111] rounded-lg">
          <div className="text-container p-2">
            <p
              className="article text-xs  "
            >
              <MDEditor.Markdown
                className='text-sm text-neutral-300 leading-8'
                source={truncateText(article.content,80)}
                style={{
                  // background: "#0a0a0a",
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
            </p>
            <div className="read-more mt-6">

              <Dialog open={isArticleOpen} onOpenChange={setIsArticleOpen}>
                <DialogTrigger>
                  <p className="text-xs underline dark:hover:text-[#fff] cursor-pointer">Read more</p>
                </DialogTrigger>
                <DialogContent className='min-w-[1460px] min-h-[850px] grid grid-cols-4'>
                  <ArticleProfile article={article}></ArticleProfile>
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

export default ArticleItem