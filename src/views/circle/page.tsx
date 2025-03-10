import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiSearch2Line} from "react-icons/ri";
import CircleList from "@/views/circle/components/circle-list.tsx";
import {Divider} from "@heroui/react";


export default function CirclePage() {

  return (
    <>
      <div className="group-container flex flex-col justify-center">
        <div className="top-section flex justify-center">
          <div className="search-area mt-8 gap-4 flex">
            <Input className="w-180 h-12" placeholder="search for subjects、users or article"/>
            <Button className="h-12 px-1">
              <RiSearch2Line className="transform scale-120"/>
              <span className="font-bold">Search</span>
            </Button>
          </div>
        </div>
        <div className="main-section space-y-10 mt-30 mx-80">
          <div className="circle-list">
            <h3 className={'text-2xl font-bold'}>Back End </h3>
            <CircleList className={'mt-3'}></CircleList>
            <CircleList className={'mt-3'}></CircleList>
            <Button
              variant={'secondary'}
              className={'mt-6'}
            >Expand</Button>

            <div className="w-full border-b mt-3"></div>

          </div>
          <div className="circle-list">
          <h3 className={'text-2xl font-bold'}>Front End </h3>

            <CircleList className={'mt-3'}></CircleList>
            <CircleList className={'mt-3'}></CircleList>
            <div className="w-full border-b"></div>
          </div>
          <div className="circle-list">
            <h3 className={'text-2xl font-bold'}> Operation and maintenance</h3>

            <CircleList className={'mt-3'}></CircleList>
            <CircleList className={'mt-3'}></CircleList>
            <div className="w-full border-b"></div>

          </div>
        </div>
      </div>
    </>
  )
}