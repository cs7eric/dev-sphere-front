import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Image} from "@unpic/react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import ArticleList from "@/components/article/article-list.tsx";
import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import articleList from "@/components/article/article-list.tsx";
import {getArticleByCircleUsingPost} from "@/apis/circle";
import NullIcon from '@/assets/illstructions/null.svg'
import ConditionalRender from "@/components/render/conditional-render.tsx";


interface Props {
  circle
}

const CircleProfileDialog: React.FC<Props> = ({circle}) => {


  const [articleListData, setArticleListData] = useState([])
  const fetchArticleListData = async () => {
    const body = {
      circleId: circle.id
    }
    const res = await getArticleByCircleUsingPost({body})
    if (res.success) {
      setArticleListData(res.data)
    }
  }

  useEffect(() => {
    fetchArticleListData()
  }, []);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className={'cursor-pointer'}>
          <span>join us</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md min-w-5xl min-h-[800px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>{circle.circleName}</DialogTitle>
            <DialogDescription>
              {circle.circleIntro}
            </DialogDescription>
            <div className="circle-data flex space-x-4 text-sm">
              <div className="data-item">{circle.memberCount} subscribers</div>
              <div className="data-item">84 articles</div>
            </div>

          </DialogHeader>
          <div>

            <ScrollArea className="h-[600px]  w-full p-2 ">

              <ConditionalRender
                data={articleListData}
                emptyText="暂无文章数据， 快去发表吧"
              >
                <ArticleList articleList={articleListData} />
              </ConditionalRender>

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

export default CircleProfileDialog;