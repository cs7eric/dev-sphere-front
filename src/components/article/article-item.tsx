import {Card} from "@heroui/react";
import {CardContent, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import {Image} from "@unpic/react";
import {Button} from "@/components/ui/button.tsx";

export default function ArticleItem() {


  return (

    <>
      <Card className="w-full border p-4 dark:bg-[#262626] rounded-md">
        <div className="user-info flex gap-2 flex-row">
          <Image
            src="https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250309224114762.png"
            width="36px"
            height="36px"
            className="rounded-sm"
          ></Image>
          <h3 className="text-lg font-bold">cccs7 @csq020611@gmail.com</h3>

        </div>
        <div className="article-detail mt-5">
          <p className="article text-xs text-[#f1f1f1]"> 不是JAVA不行了，国内IT圈的信条，导致这个方向的人太多太多了，而且看某音主播，各大培训班，仍旧一教室一教室的招，供应量太大了！JAVA在互联网领域绝对是大佬的存在，但现在互联网行情已经结束了，哪有什么新APP了！岗位肯定是越来越收缩了，这绝对不是一个增量的市场！而是一个需求不断萎靡的市场！

          </p>
        </div>
        <div className="function-section mt-5">

          <Button size="sm" variant={"outline"}>Like</Button>
          <Button size="sm" variant="ghost">Like</Button>

        </div>
      </Card>
    </>
  )
}