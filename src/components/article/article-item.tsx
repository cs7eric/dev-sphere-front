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

const ArticleItem: React.FC<Props> = ({article}) => {

  const [isFollowed, setIsFollowed] = React.useState(false);

  const [isUserOpen, setIsUserOpen] = useState(false)
  const [isArticleOpen, setIsArticleOpen] = useState(false)

  return (

    <>
      <Card className="w-full p-4 bg-neutral-200/30 border-0 rounded-md dark:text-[#f0f6fc]">

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

        <div className="article-detail mt-1  dark:bg-[#111111] rounded-lg">
          <div className="text-container">
            <p
              className="article text-xs  "
            >
              {article.articleAbstract}
            </p>
            <div className="read-more ">

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
        <div className="button-section mt-2 space-x-2 [&>*]:hover:scale-115">


          <Button size="sm" variant='ghost' className="rounded-xl cursor-pointer">
            <FcLike/>
          </Button>
          <Button size="sm" variant={"ghost"} className="rounded-xl cursor-pointer">
            <BsStarFill className="fill-amber-300"/>
          </Button>


          <Button size='sm' variant={"ghost"} className={'rounded-xl cursor-pointer'}>
            <GoAlertFill className="fill-red-600"/>
          </Button>

          <Button size='sm' variant={"ghost"} className={'rounded-xl cursor-pointer'}>

            <FaShareFromSquare className="fill-blue-300"/>

          </Button>

        </div>
      </Card>
    </>
  )
}

export default ArticleItem