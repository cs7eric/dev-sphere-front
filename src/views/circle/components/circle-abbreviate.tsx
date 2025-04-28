import React, {useEffect, useState} from "react";
import {Circle} from "@/models/circle.types.ts";
import CircleImage from '@/assets/user/avatar.jpg'
import {Image} from '@unpic/react'
import {Button} from "@/components/ui/button.tsx";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import ArticleList from "@/components/article/article-list.tsx";
import {getArticleByCircleUsingPost} from "@/apis/circle";

interface Props {
  circle: Circle
}

const CircleAbbreviate: React.FC<Props> = ({circle}) => {

  const body = {
    circleId: circle.id
  }
  const [isOpen, setIsOpen] = useState(false)
  const [articleList, setArticleList] = useState([])

  const fetchArticleList = async () => {
    const res = await getArticleByCircleUsingPost({body})
    if (res.data) {
      setArticleList(res.data)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchArticleList()
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            className="circle-abbreviate flex items-center text-xs justify-between space-x-3 rounded-base dark:bg-neutral-900 p-2 rounded-sm transition-transform hover:scale-102 duration-250 cursor-pointer">
            <div className="left-content flex space-x-3 items-center  ">
              <div className="circle-image p-0.5 bg-neutral-500 rounded-md">
                <Image
                  src={circle.icon ? CircleImage : circle.icon}
                  width="30px"
                  height="30px"
                  className={'rounded-md'}
                />
              </div>
              <div className="circle-info flex flex-col">
                <div className="circle-name">{circle.circleName}</div>
                <div className="circle-intro">{circle.circleIntro}</div>
              </div>
            </div>

            <div className="function-action">
              <Button
                size={'sm'}
                variant={'ghost'}
              >join</Button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md min-w-4xl min-h-[800px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>{circle.circleName}</DialogTitle>
            <DialogDescription>
              {circle.circleIntro}
            </DialogDescription>
            <div className="circle-data flex space-x-4 text-sm">
              <div className="data-item">{circle.memberCount} subscribers</div>
              <div className="data-item">84 articles</div>
            </div>
            <p className="circle-info">this is info for circle {circle.id}</p>

          </DialogHeader>
          <div>

            <ScrollArea className="h-[600px]  w-full p-2 ">
              <ArticleList articleList={articleList} ></ArticleList>
            </ScrollArea>

          </div>


          <DialogFooter className="sm:justify-start mt-auto">
            <Button variant='default'> Join </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  )

}


export default CircleAbbreviate
