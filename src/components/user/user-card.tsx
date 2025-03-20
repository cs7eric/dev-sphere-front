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
import UserAbbreviate from "@/components/user/user-abbreviate.tsx";
import ArticleAbbreviate from "@/components/article/article-abbreviate.tsx";
import SubjectAbbreviate from "@/views/subject/components/subject-abbreviate.tsx";
import {Subject} from "@/models/subject.types.ts";
import UserProfile from "@/views/user/components/UserProfile.tsx";


export default function UserCard() {
  const [isFollowed, setIsFollowed] = React.useState(false);



  const userAbbreviateInfo = {
    userName: 'sdsadasadasdsadsadsad',
    nickName: 'cccs7',
    id: 1,
    avatar: UserAvatar,
    email: 'cccs7@gamil.com'
  }


  return (

    <Dialog>
      <DialogTrigger asChild>
        <div className="transition-transform hover:scale-105 transform duration-250 cursor-pointer">
          <Card
            className="max-w-[350px] border dark:bg-[#111111] rounded-lg p-3 space-y-3"
          >
              <UserAbbreviate
                user={userAbbreviateInfo}
                isFollowed={true}
                requiredFollow={true}
              ></UserAbbreviate>
            <div className=" text-sm text-neutral-300 overflow-hidden">
              <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
              <span className="pt-2">
          #FrontendWithZoey
          <span aria-label="computer" className="py-2" role="img">
            💻
          </span>
        </span>
            </div>
            <div className="gap-3 flex justify-between text-sm text-neutral-400">
              <div className="flex gap-1">
                <p className="font-semibold">4</p>
                <p>Following</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold ">97.1K</p>
                <p>Followers</p>
              </div>
            </div>
          </Card>
        </div>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl lg:min-h-[800px] grid grid-cols-2">
        <UserProfile></UserProfile>
      </DialogContent>
    </Dialog>


  );
}

