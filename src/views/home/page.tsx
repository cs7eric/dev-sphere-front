import {Button} from "@/components/ui/button"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import TextPressure from "@/components/text/TextPressure.tsx";
import {LanguageSwitcher} from "@/views/home/components/language-switcher.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {LabelSection} from "@/components/subject/label-section.tsx";
import ListPage from "@/views/home/subject-list.tsx";
import MainLayout from "@/layout/layout.tsx";
import {Image} from "@unpic/react";

import JavaIcon from '@/assets/icon/java.svg'
import CppIcon from '@/assets/icon/cpp.svg'
import PythonIcon from '@/assets/icon/python.svg'
import {toast} from "@/registry/hooks/use-toast.ts";
import {getSubjectInfoUsingPost, queryPrimaryCategoryUsingPost, SubjectCategoryDTO} from "@/apis/subject";
import {useEffect, useState} from "react";

const items = ['Java', 'Python', 'React', 'Golang', 'Vue', 'C++', 'Java', 'Python', 'React', 'Golang', 'Vue', 'C++', 'Java', 'Python', 'React', 'Golang', 'Vue', 'C++', 'Java', 'Python']


export default function HomePage() {

  const [parentCategoryList, setParentCategoryList] = useState<SubjectCategoryDTO[]>([])

  const body = {
    parentId: 0,
    categoryType: 1,
  }
  const fetchParentCategoryList = async () => {
    const res = await queryPrimaryCategoryUsingPost({body})
    if (res.success) {
      setParentCategoryList(res.data)
    }
  }

  useEffect(() => {
    fetchParentCategoryList()
  }, []);

  return (
    <>


      <MainLayout>
        <div className="main-section ">
          <div className="flex itsems-center justify-between space-y-2">
            <h2 className="text-xl font-bold tracking-tight">
              <div style={{position: 'relative', width: '200px'}} className="font-blod">
                <TextPressure
                  text="Devsphere!"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#ffffff"
                  strokeColor="#ff0000"
                  minFontSize={60}
                />
              </div>
            </h2>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher className="mr-4"/>
              <Button className="font-bold">Brush Subject</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview" className="cursor-pointer">Overview</TabsTrigger>
              <TabsTrigger value="hot" className="cursor-pointer">
                Hot Spot
              </TabsTrigger>
              <TabsTrigger value="interested" className="cursor-pointer">
                Interested
              </TabsTrigger>
              <TabsTrigger value="todo" className="cursor-pointer">
                Todo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">

              <div className="container-items flex flex-row ">
                <div className="left-section flex-4/5  border-[#262626] w-full p-6">
                  <div className="recommend-list flex ">
                    <Card className="flex-1/4 mx-3 gap-2 p-5 dark:bg-[#262626]  ">

                      <div className='p-4 flex gap-2 space-x-4 hover:bg-[#181818] cursor-pointer rounded-2xl'>
                        <Image
                          src={JavaIcon}
                          width={'80px'}
                          height={'80px'}
                          className='bg-[#fafafa] p-2 rounded-lg'
                        ></Image>
                        <div className='flex flex-col space-y-1 justify-center'>
                          <h3 className="title text-lg font-bold">Java必刷50道场景题</h3>
                          <span
                            className='text-xs'>涵盖多线程、集合、面向对象设计等核心概念，帮助你深入理解Java的应用与技巧。无论初学者还是经验丰富的开发者都可以学习</span>
                        </div>
                      </div>

                    </Card>
                    <Card className="flex-1/4 mx-3 justify-center gap-2 p-5 dark:bg-[#262626]">
                      <div className='p-4 flex gap-2 space-x-4 hover:bg-[#181818] cursor-pointer rounded-2xl'>
                        <Image
                          src={PythonIcon}
                          width={'80px'}
                          height={'80px'}
                          className='  bg-[#fafafa] p-2 rounded-lg'
                        ></Image>
                        <div className='flex flex-col space-y-1 justify-center'>
                          <h3 className="title text-lg font-bold">Python必须掌握的20个框架</h3>
                          <span
                            className='text-xs overflow-hidden'>对Python常用的框架进行了梳理，这些框架包括事件I/O，OLAP，Web开发，高性能网络通信，测试，爬虫等</span>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex-1/4 mx-3 gap-2 p-5 dark:bg-[#262626]">
                      <div className='p-4 flex gap-2 space-x-4 hover:bg-[#181818] cursor-pointer rounded-2xl'>
                        <Image
                          src={CppIcon}
                          width={'80px'}
                          height={'80px'}
                          className=' bg-[#fafafa] p-2 rounded-lg'
                        ></Image>
                        <div className='flex flex-col space-y-1 justify-center'>
                          <h3 className="title text-lg font-bold">C++必刷的100道算法题</h3>
                          <span
                            className='text-xs'>精选100道算法题，涵盖基础算法、动态规划、图论等，旨在提升你的编程能力和问题解决技巧，助你在面试中脱颖而出。适合各个阶段的开发者练习与提升</span>
                        </div>
                      </div>

                    </Card>


                  </div>
                  <LabelSection className='my-6'></LabelSection>
                  <ListPage></ListPage>

                </div>
                <div className="right-section flex-1/5  h-auto">

                  <div className="field-section bg-[#262626] p-4 rounded-xl">
                    <Card>
                      <CardHeader>
                        <CardTitle>Fields</CardTitle>
                        <CardDescription>Pay attention to the technology you want to know.</CardDescription>
                      </CardHeader>
                      <CardContent>

                        <div className="field-list flex flex-wrap gap-2">

                          {Array.isArray(parentCategoryList) && parentCategoryList.length > 0 ?
                            (parentCategoryList).map((category) => (
                              <div
                                className="field-item hover:text-[#fff] text-[#a1a1a1] rounded-sm cursor-pointer text-sm p-1 hover:bg-[#262626]"
                                onClick={() => console.log(category.id)}
                              >{category.categoryName}</div>
                            )) : (
                              <div>null</div>
                            )
                          }

                        </div>


                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button>view all！</Button>
                      </CardFooter>
                    </Card>
                    {/*userList*/}
                    <Card className="mt-3 h-90"></Card>
                    {/*website*/}
                    <div
                      className="mt-6 hover:text-[#fff] text-[#a1a1a1] rounded-sm cursor-pointer text-sm p-1 hover:bg-[#262626] ">
                      <div className="website  gap-2">
                        <div className="flex">
                          <div
                            className="website-item p-2 text-[#a1a1a1] hover:bg-[#262626] cursor-pointer text-sm hover:text-[#fff] rounded-sm">term
                          </div>
                          <div
                            className="website-item p-2 text-[#a1a1a1] hover:bg-[#262626] cursor-pointer text-sm hover:text-[#fff] rounded-sm">contact
                            us
                          </div>
                          <div
                            className="website-item p-2 text-[#a1a1a1] hover:bg-[#262626] cursor-pointer text-sm hover:text-[#fff] rounded-sm">Privacy
                            policy
                          </div>
                        </div>
                        <div
                          className="website-item p-2 text-[#a1a1a1] hover:bg-[#262626] cursor-pointer text-sm hover:text-[#fff] rounded-sm">豫ICP备2023014864号
                        </div>
                        <div
                          className="website-item p-2 text-[#a1a1a1] hover:bg-[#262626] cursor-pointer text-sm hover:text-[#fff] rounded-sm">Copyright
                          &copy cccs7/cs7eric
                        </div>
                        <div
                          className="website-item p-2 text-[#a1a1a1] hover:bg-[#262626] cursor-pointer text-sm hover:text-[#fff] rounded-sm">联系邮箱:
                          csq020611@gmail.com
                        </div>
                      </div>


                    </div>
                  </div>


                </div>
              </div>
            </TabsContent>

            <TabsContent value="hot" className="space-y-4">
              <ListPage></ListPage>
            </TabsContent>

            <TabsContent value="interested" className="space-y-4">
              <ListPage></ListPage>
            </TabsContent>

            <TabsContent value="todo" className="space-y-4">
              <ListPage></ListPage>
            </TabsContent>

          </Tabs>
        </div>
      </MainLayout>

    </>
  )
}
