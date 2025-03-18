import {Avatar, Card, Tooltip} from "@heroui/react";
import {GoAlertFill} from "react-icons/go";
import {Image} from "@unpic/react";
import {Button} from "@/components/ui/button.tsx";
import {FcLike} from "react-icons/fc";
import {BsStarFill} from "react-icons/bs";
import React from "react";
import {FaShareFromSquare} from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import UserAvatar from '@/assets/user/avatar.jpg'
import {RiUserFollowLine, RiUserUnfollowLine} from "react-icons/ri";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Input} from "@/components/ui/input.tsx";
import { IoIosSend } from "react-icons/io";
import CommentItem from "@/components/article/comment-item.tsx";
export default function ArticleItem() {

  const [isFollowed, setIsFollowed] = React.useState(false);

  return (

    <>
      <Card className="w-full border p-4  rounded-md dark:text-[#f0f6fc]">
        <div className="user-info flex gap-2 flex-row">

          <Image
            src="https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250309224114762.png"
            width="40px"
            height="40px"
            className="rounded-sm hover:transform hover:scale-110 cursor-pointer"

          ></Image>
          <div>
            <h3 className="text-sm font-bold cursor-pointer">cccs7 @csq020611@gmail.com</h3>
            <p className="text-xs text-[#828c97]">6 days ago</p>
          </div>

        </div>
        <h3 className="font-bold mt-2">Java 的行业现状</h3>

        <div className="article-detail mt-2 p-1 dark:bg-[#111111] rounded-lg">
          <div className="text-container p-2">
            <p
              className="article text-xs  "> 不是JAVA不行了，国内IT圈的信条，导致这个方向的人太多太多了，而且看某音主播，各大培训班，仍旧一教室一教室的招，供应量太大了！JAVA在互联网领域绝对是大佬的存在，但现在互联网行情已经结束了，哪有什么新APP了！岗位肯定是越来越收缩了，这绝对不是一个增量的市场！而是一个需求不断萎靡的市场！
            </p>
            <div className="read-more mt-6">

              <Dialog>
                <DialogTrigger>
                  <p className="text-xs underline dark:hover:text-[#fff] cursor-pointer">Read more</p>
                </DialogTrigger>
                <DialogContent className='min-w-[1460px] min-h-[850px] grid grid-cols-4'>
                  <section className="left border-r flex flex-col justify-between space-y-4 col-span-3">
                    <div className="article-content space-y-3 pr-2">
                      <div className="article-title">
                        <h3 className="article-title font-bold text-lg">
                          Java 泛型中的通配符 T，E，K，V，？有去搞清楚吗？
                        </h3>
                      </div>
                      <div className="label-list space-x-3 text-xs">
                        <span className="label p-1 border rounded-md bg-neutral-600 text-neutral-200">Java</span>
                        <span className="label p-1 border rounded-md bg-neutral-600 text-neutral-200">Spring</span>
                        <span className="label p-1 border rounded-md bg-neutral-600 text-neutral-200">SpringCloud</span>
                      </div>
                      <div className="article-data text-xs space-x-3 flex">
                        <div className="data-item text-neutral-500 ">
                          <span>发布于 一天前</span>
                        </div>
                        <div className="data-item text-neutral-500">
                          14k likes
                        </div>
                        <div className="data-item text-neutral-500">
                          2k collected
                        </div>
                        <div className="data-item text-neutral-500">
                          0.2k commended
                        </div>
                      </div>
                      <ScrollArea className='max-w-[1380px] h-[650px]'>
                        <div className="article-detail text-sm text-neutral-300 leading-8">
                          <p>不久前，被人问到Java 泛型中的通配符 T，E，K，V，?
                            是什么？有什么用？这不经让我有些回忆起该开始学习Java那段日子，那是对泛型什么的其实有些迷迷糊糊的，学的不这么样，是在做项目的过程中，渐渐有又看到别人的代码、在看源码的时候老是遇见，之后就专门去了解学习，才对这几个通配符
                            T，E，K，V，?有所了解。</p>
                          <p>在介绍这几个通配符之前，我们先介绍介绍泛型，看看泛型带给我们的好处。
                            Java泛型是JDK5中引入的一个新特性，泛型提供了编译是类型安全检测机制，这个机制允许开发者在编译是检测非法类型。泛型的本质就是参数化类型，就是在编译时对输入的参数指定一个数据类型。</p>
                          <p>不久前，被人问到Java 泛型中的通配符 T，E，K，V，?
                            是什么？有什么用？这不经让我有些回忆起该开始学习Java那段日子，那是对泛型什么的其实有些迷迷糊糊的，学的不这么样，是在做项目的过程中，渐渐有又看到别人的代码、在看源码的时候老是遇见，之后就专门去了解学习，才对这几个通配符
                            T，E，K，V，?有所了解。</p>
                          <p>在介绍这几个通配符之前，我们先介绍介绍泛型，看看泛型带给我们的好处。
                            Java泛型是JDK5中引入的一个新特性，泛型提供了编译是类型安全检测机制，这个机制允许开发者在编译是检测非法类型。泛型的本质就是参数化类型，就是在编译时对输入的参数指定一个数据类型。</p>
                          <p>不久前，被人问到Java 泛型中的通配符 T，E，K，V，?
                            是什么？有什么用？这不经让我有些回忆起该开始学习Java那段日子，那是对泛型什么的其实有些迷迷糊糊的，学的不这么样，是在做项目的过程中，渐渐有又看到别人的代码、在看源码的时候老是遇见，之后就专门去了解学习，才对这几个通配符
                            T，E，K，V，?有所了解。</p>
                          <p>在介绍这几个通配符之前，我们先介绍介绍泛型，看看泛型带给我们的好处。
                            Java泛型是JDK5中引入的一个新特性，泛型提供了编译是类型安全检测机制，这个机制允许开发者在编译是检测非法类型。泛型的本质就是参数化类型，就是在编译时对输入的参数指定一个数据类型。</p>
                          <p>不久前，被人问到Java 泛型中的通配符 T，E，K，V，?
                            是什么？有什么用？这不经让我有些回忆起该开始学习Java那段日子，那是对泛型什么的其实有些迷迷糊糊的，学的不这么样，是在做项目的过程中，渐渐有又看到别人的代码、在看源码的时候老是遇见，之后就专门去了解学习，才对这几个通配符
                            T，E，K，V，?有所了解。</p>
                          <p>在介绍这几个通配符之前，我们先介绍介绍泛型，看看泛型带给我们的好处。
                            Java泛型是JDK5中引入的一个新特性，泛型提供了编译是类型安全检测机制，这个机制允许开发者在编译是检测非法类型。泛型的本质就是参数化类型，就是在编译时对输入的参数指定一个数据类型。</p>
                          <p>不久前，被人问到Java 泛型中的通配符 T，E，K，V，?
                            是什么？有什么用？这不经让我有些回忆起该开始学习Java那段日子，那是对泛型什么的其实有些迷迷糊糊的，学的不这么样，是在做项目的过程中，渐渐有又看到别人的代码、在看源码的时候老是遇见，之后就专门去了解学习，才对这几个通配符
                            T，E，K，V，?有所了解。</p>
                          <p>在介绍这几个通配符之前，我们先介绍介绍泛型，看看泛型带给我们的好处。
                            Java泛型是JDK5中引入的一个新特性，泛型提供了编译是类型安全检测机制，这个机制允许开发者在编译是检测非法类型。泛型的本质就是参数化类型，就是在编译时对输入的参数指定一个数据类型。</p>
                          <p>不久前，被人问到Java 泛型中的通配符 T，E，K，V，?
                            是什么？有什么用？这不经让我有些回忆起该开始学习Java那段日子，那是对泛型什么的其实有些迷迷糊糊的，学的不这么样，是在做项目的过程中，渐渐有又看到别人的代码、在看源码的时候老是遇见，之后就专门去了解学习，才对这几个通配符
                            T，E，K，V，?有所了解。</p>
                          <p>在介绍这几个通配符之前，我们先介绍介绍泛型，看看泛型带给我们的好处。
                            Java泛型是JDK5中引入的一个新特性，泛型提供了编译是类型安全检测机制，这个机制允许开发者在编译是检测非法类型。泛型的本质就是参数化类型，就是在编译时对输入的参数指定一个数据类型。</p>
                          <p>不久前，被人问到Java 泛型中的通配符 T，E，K，V，?
                            是什么？有什么用？这不经让我有些回忆起该开始学习Java那段日子，那是对泛型什么的其实有些迷迷糊糊的，学的不这么样，是在做项目的过程中，渐渐有又看到别人的代码、在看源码的时候老是遇见，之后就专门去了解学习，才对这几个通配符
                            T，E，K，V，?有所了解。</p>
                          <p>在介绍这几个通配符之前，我们先介绍介绍泛型，看看泛型带给我们的好处。
                            Java泛型是JDK5中引入的一个新特性，泛型提供了编译是类型安全检测机制，这个机制允许开发者在编译是检测非法类型。泛型的本质就是参数化类型，就是在编译时对输入的参数指定一个数据类型。</p>
                          <p>不久前，被人问到Java 泛型中的通配符 T，E，K，V，?
                            是什么？有什么用？这不经让我有些回忆起该开始学习Java那段日子，那是对泛型什么的其实有些迷迷糊糊的，学的不这么样，是在做项目的过程中，渐渐有又看到别人的代码、在看源码的时候老是遇见，之后就专门去了解学习，才对这几个通配符
                            T，E，K，V，?有所了解。</p>
                          <p>在介绍这几个通配符之前，我们先介绍介绍泛型，看看泛型带给我们的好处。
                            Java泛型是JDK5中引入的一个新特性，泛型提供了编译是类型安全检测机制，这个机制允许开发者在编译是检测非法类型。泛型的本质就是参数化类型，就是在编译时对输入的参数指定一个数据类型。</p>
                        </div>

                      </ScrollArea>
                    </div>
                    <div className="article-function space-x-3">
                      <Tooltip content="like it" size="sm" className="text-xs">
                        <Button size="sm" variant={"outline"} className="rounded-md cursor-pointer">
                          <FcLike className='fill-neutral-50'/>
                        </Button>
                      </Tooltip>
                      <Tooltip content="collect it" size="sm" className="text-xs">

                        <Button size="sm" variant={"outline"} className="rounded-md cursor-pointer">
                          <BsStarFill className=""/>
                        </Button>
                      </Tooltip>

                      <Tooltip content="report it" size="sm" className="text-xs">

                        <Button size='sm' variant={"outline"} className={'rounded-md cursor-pointer'}>
                          <GoAlertFill />
                        </Button>
                      </Tooltip>

                      <Button size='sm' variant={"outline"} className={'rounded-md cursor-pointer'}>

                        <FaShareFromSquare className=""/>

                      </Button>
                    </div>
                  </section>
                  <section className="right col-span-1 space-y-4 relative">
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
                      <div>
                        <div>
                          <Button
                            className={isFollowed ? "bg-transparent mr-5 cursor-pointer hover:transform transition-transform duration-250 hover:scale-120  text-foreground border-default-200" : "hover:transform transition-transform duration-250 hover:scale-120 mr-5 cursor-pointer"}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant={isFollowed ? "outline" : "default"}
                            onClick={() => setIsFollowed(!isFollowed)}
                          >
                            {isFollowed ? <RiUserUnfollowLine/> : <RiUserFollowLine/>}
                          </Button>
                        </div>

                      </div>


                    </div>
                    <div className="article-outline text-xs leading-7 min-h-[180px]">
                      <p> 不久前，被人问到Java 泛型中的通配符 T，E，K，V，?
                        是什么？有什么用？这不经让我有些回忆起该开始学习Java那段日子，那是对泛型什么的其实有些迷迷糊糊的，学的不这么样，是在做项目的过程中，渐渐有又看到别人的代码、在看源码的时候老是遇见，之后就专门去了解学习，才对这几个通配符
                        T，E，K，V，?有所了解。
                      </p>
                    </div>
                    <div className="comment-area border-t pt-3">
                      <span className='text-xs text-neutral-600'>共 87 条 评论</span>
                      <ScrollArea className='h-[460px]'>
                        <CommentItem></CommentItem>
                        <CommentItem></CommentItem>
                        <CommentItem></CommentItem>
                        <CommentItem></CommentItem>
                        <CommentItem></CommentItem>
                        <CommentItem></CommentItem>
                        <CommentItem></CommentItem>

                      </ScrollArea>
                    </div>
                    <div className="flex w-full absolute border-t pt-3 bottom-1 left-0 right-0 max-w-sm items-center space-x-2">
                      <Image
                        src={UserAvatar}
                        width={'36px'}
                        height={'36px'}
                        className={'rounded-md bg-neutral-700 p-0.5'}
                      ></Image>
                      <Input type="text" placeholder="talk about it" className='bg-[#1b1b1b] text-neutral-400'/>
                      <Button type="submit" className='w-[36px] cursor-pointer' variant='outline'><IoIosSend /></Button>
                    </div>
                  </section>

                </DialogContent>
              </Dialog>


            </div>

          </div>

        </div>
        <div className="button-section mt-5 space-x-2">


          <Tooltip content="like it" size="sm" className="text-xs">
            <Button size="sm" variant={"outline"} className="rounded-xl cursor-pointer">
            <FcLike/>
            </Button>
          </Tooltip>
          <Tooltip content="collect it" size="sm" className="text-xs">

            <Button size="sm" variant={"outline"} className="rounded-xl cursor-pointer">
              <BsStarFill className="fill-amber-300"/>
            </Button>
          </Tooltip>

          <Tooltip content="report it" size="sm" className="text-xs">

            <Button size='sm' variant={"outline"} className={'rounded-xl cursor-pointer'}>
              <GoAlertFill className="fill-red-600"/>
            </Button>
          </Tooltip>

          <Button size='sm' variant={"outline"} className={'rounded-xl cursor-pointer'}>

            <FaShareFromSquare className="fill-blue-300"/>

          </Button>

        </div>
      </Card>
    </>
  )
}