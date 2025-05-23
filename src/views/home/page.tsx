import {Button} from "@/components/ui/button"
import {useNavigate} from "react-router-dom";
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

import CppIcon from '@/assets/icon/cpp.svg'
import PythonIcon from '@/assets/icon/python.svg'
import {queryPrimaryCategoryUsingPost, SubjectCategoryDTO} from "@/apis/subject";
import React, {useEffect, useState} from "react";
import ReverseCard from "@/components/card/reverse-card.tsx";
import CircleAggregate from "@/views/circle/components/circle-aggregate.tsx";
import {RetryWrapper} from "@/components/retry/retry-wrapper";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {toast} from "@/registry/hooks/use-toast.ts";
import TagsLoader from "@/components/loader/tags-loader.tsx";
import {mockSubjectList} from "@/models/subject.types.ts";
import AnimatedList from "@/components/list/animated-list.tsx";


export default function HomePage() {
  const navigate = useNavigate();
  const [parentCategoryList, setParentCategoryList] = useState<SubjectCategoryDTO[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const body = {
    parentId: 0,
    categoryType: 1,
  }
  const fetchParentCategoryList = async () => {
    const res = await queryPrimaryCategoryUsingPost({body})
    if (res.success) {
      return res.data
    }
    throw new Error('获取分类列表失败')
  }

  // 不再需要这个useEffect，因为RetryWrapper会自动调用fetchData
  // useEffect(() => {
  //   fetchParentCategoryList()
  // }, []);

  // 处理语言变化
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    console.log("语言已切换为:", language);
  };

  // 处理刷题按钮点击
  const handleBrushSubject = () => {
    setIsLoading(true);

    try {
      // 从 state 或 localStorage 获取语言
      const language = selectedLanguage || localStorage.getItem('selectedLanguage') || 'java';
      console.log("刷题语言:", language);

      // 生成随机题目ID (1-100)
      const randomSubjectId = Math.floor(Math.random() * 100) + 1;

      // 导航到答题页面
      navigate(`/subject/answer-subject/${randomSubjectId}?language=${language}`);
    } catch (error) {
      console.error("错误:", error);
      toast({
        title: "发生错误",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>


    <MainLayout>
      <div className="main-section ">
        <div className="flex itsems-center justify-between space-y-2">
          <h2 className="text-xl font-bold tracking-tight">
            <div style={{position: 'relative', width: '200px'}} className="font-blod">
              {/*<video  width="340" height="160" controls autoPlay loop muted playsInline>*/}
              {/*  <source src="/src/assets/mp4/home.mp4" type="video/mp4"/>*/}
              {/*  您的浏览器不支持 HTML5 视频标签。*/}
              {/*</video>*/}
              <TextPressure
                text="Devsphere!"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                // textColor="#ffffff"
                textColor="#000"
                strokeColor="#ff0000"
                minFontSize={60}
              />
            </div>
          </h2>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher
              className="mr-4"
              onLanguageChange={handleLanguageChange}
            />
            <Button
              className="font-bold bg-white text-[#2b2b2b] border hover:bg-[#f5f5f5]  hover:text-[#000]"
              onClick={handleBrushSubject}
              disabled={isLoading}
            >
              {isLoading ? "加载中..." : "Brush Subject"}
            </Button>
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
              <div className="left-section flex-5/6  border-[#262626] w-full ">
                {/*<div className="recommend-list grid grid-cols-3 ">*/}
                {/*  <ReverseCard></ReverseCard>*/}
                {/*  <ReverseCard></ReverseCard>*/}
                {/*  <ReverseCard></ReverseCard>*/}


                {/*</div>*/}
                <LabelSection className='my-6'></LabelSection>
                <ListPage></ListPage>

              </div>
              <div className="right-section flex-1/6 h-auto">

                <div className="field-section  bg-neutral-200/30 dark:bg-[#262626] p-4 px-6 rounded-xl">
                  <div className={'border-0 space-y-3'}>
                    <div>
                      <h3 className={'font-bold text-lg'}>View Fields</h3>
                      <CardDescription>Pay attention to the technology you want to know.</CardDescription>
                    </div>
                    <div>

                      <div className="field-list flex flex-wrap gap-2">
                        <RetryWrapper
                          fetchData={fetchParentCategoryList}
                          loadingComponent={

                            <TagsLoader tagWidth="60px" tagHeight="16px"/>
                          }
                          errorTitle="获取分类列表失败"
                          errorDescription="无法获取分类数据，请检查网络连接后重试"
                          retryButtonText="重新获取"
                        >
                          {(categoryList) => (
                            <>
                              {categoryList.map((category) => (
                                <div
                                  key={category.id}
                                  className="field-item dark:hover:text-[#fff] font-semibold rounded-sm cursor-pointer text-sm text-neutral-800/50  dark:text-[#a1a1a1] p-1 hover:bg-neutral-400/50  dark:hover:bg-[#262626]"
                                  onClick={() => console.log(category.id)}
                                >
                                  <CircleAggregate
                                    category={category}
                                  ></CircleAggregate>
                                </div>
                              ))}
                            </>
                          )}
                        </RetryWrapper>
                      </div>


                    </div>
                    <div className="flex justify-between">
                      <Button>view all！</Button>
                    </div>
                  </div>
                </div>

                <div className="field-section mt-3 bg-neutral-200/30 dark:bg-[#262626] p-4 px-6 rounded-xl">
                  <div className={'border-0 space-y-3'}>
                    <div>
                      <h3 className={'font-bold text-lg'}>Hot!!!</h3>
                      <CardDescription>There is the hot subject which users brushing.</CardDescription>
                    </div>
                    <div>
                      <AnimatedList
                        items={mockSubjectList}
                        itemType='subject'
                        onItemSelect={(item, index) => console.log(item, index)}
                        showGradients={true}
                        enableArrowNavigation={true}
                        displayScrollbar={true}
                        theme="light"
                      />


                    </div>

                  </div>
                </div>

                <div className="field-section mt-3  bg-neutral-200/30 dark:bg-[#262626] p-4 px-6 rounded-xl">
                  <div
                    className="hover:text-neutral-800 dark:hover:text-[#fff] text-[#a1a1a1] rounded-sm cursor-pointer text-sm p-1  ">
                    <div className="website  gap-2">
                      <div className="flex">
                        <div
                          className="website-item p-2 text-[#a1a1a1] hover:text-neutral-800 cursor-pointer text-sm dark:hover:text-[#fff] rounded-sm">term
                        </div>
                        <div
                          className="website-item p-2 text-[#a1a1a1] hover:text-neutral-800 cursor-pointer text-sm dark:hover:text-[#fff] rounded-sm">contact
                          us
                        </div>
                        <div
                          className="website-item p-2 text-[#a1a1a1] hover:text-neutral-800 cursor-pointer text-sm dark:hover:text-[#fff] rounded-sm">Privacy
                          policy
                        </div>
                      </div>
                      <div
                        className="website-item p-2 text-[#a1a1a1] dark:hover:bg-[#262626] cursor-pointer text-sm hover:text-neutral-800 dark:hover:text-[#fff] rounded-sm">豫ICP备2023014864号
                      </div>
                      <div
                        className="website-item p-2 text-[#a1a1a1] dark:hover:bg-[#262626] cursor-pointer text-sm hover:text-neutral-800 dark:hover:text-[#fff] rounded-sm">Copyright
                        &copy cccs7/cs7eric
                      </div>
                      <div
                        className="website-item p-2 text-[#a1a1a1]  cursor-pointer text-sm hover:text-neutral-800 dark:hover:text-[#fff] rounded-sm">联系邮箱:
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
