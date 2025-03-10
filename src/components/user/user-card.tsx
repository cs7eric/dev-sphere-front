import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Button} from "@heroui/react";
import {RiUserFollowLine, RiUserUnfollowLine} from "react-icons/ri";
import {LazyImage} from "@/components/ui/lazy-image";

export default function UserCard() {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-[350px] border dark:bg-[#111111] rounded-lg p-3">
      <CardHeader className="justify-between">
        <div className="flex items-center gap-3">


          <LazyImage
            src="https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250309224114762.png"
            width="40px"
            height="40px"
            className="rounded-sm hover:transform hover:scale-110 cursor-pointer"
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
          {isFollowed ? <RiUserFollowLine /> : <RiUserUnfollowLine />}
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
  );
}

