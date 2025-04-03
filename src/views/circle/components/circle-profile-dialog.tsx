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
import React from "react";


interface Props {
  circle
}
const CircleProfileDialog: React.FC<Props> = ({circle}) => {

  return (
    <>
      <Dialog>
        <DialogTrigger asChild className={'cursor-pointer'}>
          <span>join us</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md min-w-5xl min-h-[800px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>{circle.name}</DialogTitle>
            <DialogDescription>
              {circle.intro}
            </DialogDescription>
            <div className="circle-data flex space-x-4 text-sm">
              <div className="data-item">{circle.memberCount} subscribers</div>
              <div className="data-item">84 articles</div>
            </div>

          </DialogHeader>
          <div>

            <ScrollArea className="h-[600px]  w-full p-2 ">
              <ArticleList></ArticleList>
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