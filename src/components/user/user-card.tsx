import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Button} from "@heroui/react";
import {RiUserFollowLine, RiUserUnfollowLine} from "react-icons/ri";
import {LazyImage} from "@/components/ui/lazy-image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Image} from "@unpic/react";
import UserAvatar from "@/assets/user/avatar.jpg";

import {UserLineChart} from "@/views/forms/social-contact/components/user-line-chart.tsx";
import CircleAbbreviate from "@/views/circle/components/circle-abbreviate.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";



export default function UserCard() {
  const [isFollowed, setIsFollowed] = React.useState(false);

  const circle = {
    id: 1,
    image: '',
    circleName: 'Java'
  }

  const labelList = [
    {
      labelName: "Java"
    },
    {
      labelName: "Python"
    },
    {
      labelName: "C++"
    },
    {
      labelName: "React"
    },
    {
      labelName: "Python"
    },
    {
      labelName: "C++"
    },
    {
      labelName: "React"
    }
  ]

  return (

    <Dialog>
      <DialogTrigger asChild>
        <div className="transition-transform hover:scale-105 transform duration-250 cursor-pointer">
          <Card
            className="max-w-[350px] border dark:bg-[#111111] rounded-lg p-3"
          >
            <CardHeader className="justify-between">
              <div className="flex items-center gap-3">
                <LazyImage
                  src="https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250309224114762.png"
                  width="40px"
                  height="40px"
                  className="rounded-sm  cursor-pointer"
                  loadingClassName="blur-sm"
                  threshold={0.2}
                  rootMargin="50px"
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                  <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                </div>
              </div>
              <Button
                className={isFollowed ? "bg-transparent cursor-pointer hover:transform hover:scale-120  text-foreground border-default-200" : "hover:transform hover:scale-120  cursor-pointer"}
                color="primary"
                radius="full"
                size="sm"
                variant={isFollowed ? "bordered" : "solid"}
                onPress={() => setIsFollowed(!isFollowed)}
              >
                {isFollowed ? <RiUserFollowLine/> : <RiUserUnfollowLine/>}
              </Button>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400 overflow-hidden">
              <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
              <span className="pt-2">
          #FrontendWithZoey
          <span aria-label="computer" className="py-2" role="img">
            💻
          </span>
        </span>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">4</p>
                <p className=" text-default-400 text-small">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">97.1K</p>
                <p className="text-default-400 text-small">Followers</p>
              </div>
            </CardFooter>
          </Card>
        </div>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl lg:min-h-[800px] grid grid-cols-2">
        <section className="left border-r space-y-3 pr-5">
          <div className="flex ">
            <div className="author-info flex justify-between">
              <div className='flex space-x-2 items-center'>
                <Image
                  src={UserAvatar}
                  width={'36px'}
                  height={'36px'}
                  className={'rounded-md bg-neutral-700 p-0.5'}
                ></Image>
                <h3 className="author-username ml-1.5 text-sm font-semibold">cccs7</h3>
              </div>
            </div>
          </div>
          <div className="user-info mt-2 py-0 text-xs text-default-400 overflow-hidden">
            <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
            <span className="pt-2">
               #FrontendWithZoey
              <span aria-label="computer" className="py-2" role="img">
                💻
              </span>
            </span>
          </div>
          <div className="user-label-list gap-2 mt-8 flex flex-wrap ">
            {Array.isArray(labelList) && labelList.length > 0 ? (
              labelList.map((label) => (
                <span
                  key={label.id}
                  className="p-1  text-xs border rounded-md px-2 inline-block "
                >{label.labelName}</span>
              ))
            ) : (
              <div className="empty w-full"></div>
            )}
          </div>
          <div className="pie-chart">
            {/*<UserPieChart></UserPieChart>*/}
          </div>
          <div className="user-data-charts mt-8">
            <UserLineChart></UserLineChart>
          </div>
          <div className="user-circle-list space-y-3">
            <CircleAbbreviate circle={circle}></CircleAbbreviate>
            <CircleAbbreviate circle={circle}></CircleAbbreviate>
            <CircleAbbreviate circle={circle}></CircleAbbreviate>
            <CircleAbbreviate circle={circle}></CircleAbbreviate>

          </div>
        </section>
        <section className="right">
          <Tabs defaultValue="article" className="w-[200px]">
          <TabsList>
            <TabsTrigger value="article">article</TabsTrigger>
            <TabsTrigger value="subject">subject</TabsTrigger>
          </TabsList>
          <TabsContent value="article"></TabsContent>
          <TabsContent value="subject"></TabsContent>
        </Tabs>
        </section>
      </DialogContent>
    </Dialog>


  );
}

