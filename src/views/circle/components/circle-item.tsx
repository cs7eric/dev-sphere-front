import type {Circle} from "@/models/circle.types.ts";
import React from "react";
import {Image} from '@unpic/react'
import {
  Drawer, DrawerClose,
  DrawerContent,
  DrawerDescription, DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Copy} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import ArticleList from "@/components/article/article-list.tsx";

interface Props {
  circle: Circle
}

const CircleItem: React.FC<Props> = ({circle}) => {


  return (
    <>

      <Dialog>
        <DialogTrigger asChild>
          <div
            className="circle-item flex justify-center flex-col cursor-pointer p-4 transform transition-transform duration-250 hover:scale-115">
            <Image
              src={circle.icon}
              width={'100px'}
              height={'100px'}
              className={'rounded-full'}
            ></Image>
            <div className="info-section flex flex-col justify-center items-center">
              <h3 className="font-semibold">Java</h3>
              <span className={'text-neutral-500 text-xs'}>98.2w subscribe</span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md min-w-[600px] min-h-[800px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>Circle Detail {circle.id}</DialogTitle>
            <DialogDescription>
              join in this, and you could enjoy some interesting here!
            </DialogDescription>
            <div className="circle-data flex space-x-4 text-sm">
              <div className="data-item">9002 subscribers</div>
              <div className="data-item">84 articles</div>
            </div>
            <p className="circle-info">this is info for circle {circle.id}</p>

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

export default CircleItem