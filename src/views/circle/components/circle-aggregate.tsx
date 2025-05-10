import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import {getCircleListByCategoryUsingPost} from "@/apis/circle";
import CircleAbbreviate from "@/views/circle/components/circle-abbreviate.tsx";
import DataLoader from "@/components/render/data-loader.tsx";
import EmptyState from "@/components/null/empty-state.tsx";
import DogLoader from "@/components/loader/dog-loader.tsx";


interface Props {
  category,
}

const CircleAggregate: React.FC<Props> = ({category}) => {

  const [circleList, setCircleList] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const fetchCircleList = async () => {

    const body = {
      categoryId: category.id
    }
    const res = await getCircleListByCategoryUsingPost({body})
    if (res.success) {
      setCircleList(res.data)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchCircleList();
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className={'cursor-pointer'}>
          <span>{category.categoryName}</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md min-w-md min-h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>
              <span>有关 {category.categoryName} 的圈子</span>
            </DialogTitle>
            <DialogDescription>
            </DialogDescription>

          </DialogHeader>
          <div>

            <ScrollArea className="h-[400px] p-2 ">
              <div className="circle-list space-y-3">

                <DataLoader
                  data={circleList}
                  loading={loading}
                  emptyComponent={<EmptyState/>}
                  loaderComponent={<DogLoader size={20}/>}
                >
                  {(data) => (
                    (data).map((circle) => (
                    <CircleAbbreviate
                      circle={circle}
                      key={circle.id}
                    ></CircleAbbreviate>

                    )))}
                </DataLoader>
              </div>
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

export default CircleAggregate;