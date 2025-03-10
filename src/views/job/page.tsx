import RecruitImage from '@/assets/image/recruit.png'
import {Image} from "@unpic/react";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {PiToolboxFill} from "react-icons/pi";
import CompanyList from "@/views/job/components/company-list.tsx";
import ResumeIcon from '@/assets/icon/resume.svg'
import AiIcon from '@/assets/icon/chatgpt.svg'
import RoadmapIcon from '@/assets/icon/roadmap.svg'
import ProgramIcon from '@/assets/icon/program.svg'
import ArticleList from "@/components/article/article-list.tsx";


export default function JobPage() {

  return (
    <>
      <div className="job-container items-start mx-70 flex flex-col justify-center ">

        <div className="poster-section flex w-full justify-center items-center">
          <Image
            src={RecruitImage}
            className="rounded-2xl border"
          ></Image>
        </div>
        <div className="job-main-section mt-5 flex w-full gap-3">
          <div className="left-section w-2/3 space-y-5">
            <div>
              <Tabs defaultValue="overview" className="space-y-4 ">

                <Card className="company-area border">

                  <CardHeader className="flex-row flex items-center space-x-4">
                    <h3 className="font-bold text-xl" style={{fontFamily: 'emblemaone'}}>Recruitment</h3>
                    <TabsList className="bg-transparent ">
                      <TabsTrigger value="overview" className="cursor-pointer font-extrabold">Overview</TabsTrigger>
                      <TabsTrigger value="all" className="cursor-pointer font-extrabold">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="recent" className="cursor-pointer font-extrabold">
                        Recent
                      </TabsTrigger>

                    </TabsList>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="overview" className="space-y-4">
                      <CompanyList></CompanyList>
                    </TabsContent>
                    <TabsContent value="all" className="space-y-4">
                      all
                    </TabsContent>
                    <TabsContent value="recent" className="space-y-4">
                      recent
                    </TabsContent>
                  </CardContent>
                </Card>
              </Tabs>
            </div>
            <div className="job-exp-section">
              <Tabs defaultValue="recommend" className="space-y-4 ">

                <Card className="company-area border">

                  <CardHeader className="flex-row flex items-center space-x-4">
                    <h3 className="font-bold text-xl" style={{fontFamily: 'emblemaone'}}>Job Exp</h3>
                    <TabsList className="bg-transparent ">
                      <TabsTrigger value="recommend" className="cursor-pointer font-extrabold">Overview</TabsTrigger>
                      <TabsTrigger value="focus" className="cursor-pointer font-extrabold">
                        Focus
                      </TabsTrigger>
                      <TabsTrigger value="circle" className="cursor-pointer font-extrabold">
                        Circle
                      </TabsTrigger>

                    </TabsList>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="recommend" className="space-y-4">
                      <ArticleList></ArticleList>
                    </TabsContent>
                    <TabsContent value="focus" className="space-y-4">
                      focus
                    </TabsContent>
                    <TabsContent value="circle" className="space-y-4">
                      circle
                    </TabsContent>
                  </CardContent>
                </Card>
              </Tabs>
            </div>
          </div>
          <div className="right-section w-1/3 space-y-3 sticky self-start">
            <Card className="border">
              <CardHeader>
                <h3 className="font-bold text-xl" style={{fontFamily: 'emblemaone'}}>Announcement</h3>
              </CardHeader>
              <CardContent>

                <div className="announcement-section p-4 dark:bg-[#111111] rounded-lg space-y-3">
                  <p className="text-xs text-neutral-400">1. 2025届春季招聘正式开始，约 xxx 家公司开启网申通道！</p>
                  <p className="text-xs text-neutral-400">2.
                    随着春天的到来，我们的2025年春季招聘正式启动！从3月15日到4月30日，我们将开放多个岗位，包括技术、市场、设计和行政等领域。</p>
                  <p className="text-xs text-neutral-400">3.
                    请随时访问我们的平台，获取最新的招聘动态和活动信息。祝大家在春招中取得优异成果！</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border">
              <CardHeader className="flex flex-row items-center space-x-2">
                <PiToolboxFill className="transform scale-125"/>
                <h3 className="font-bold text-xl" style={{fontFamily: 'emblemaone'}}>Tools</h3>
              </CardHeader>
              <CardContent>

                <div className="tools-section  rounded-lg space-y-3">
                  <div className="resume-tool grid grid-cols-2 gap-2">
                    <div
                      className="resume-item p-2 dark:bg-[#111111] hover:transform hover:scale-105 cursor-pointer rounded-md space-x-2 flex flex-row items-center">

                      <Image
                        src={ResumeIcon}
                        width='60px'
                        height='60px'

                      ></Image>
                      <div className="intro space-y-2  ">
                        <p className="text-base font-bold text-neutral-200">简历模板</p>
                        <p className="text-xs text-neutral-400">面试机会快人一步</p>
                      </div>
                    </div>
                    <div
                      className="resume-item p-2 dark:bg-[#111111] hover:transform hover:scale-105 cursor-pointer rounded-md space-x-2 flex flex-row items-center">
                      <Image
                        src={AiIcon}
                        width={'60px'}
                        height='60px'

                      ></Image>
                      <div className="intro space-y-2  ">
                        <p className="text-base font-bold text-neutral-200">AI简历官</p>
                        <p className="text-xs text-neutral-400">查漏补缺方方面面</p>

                      </div>
                    </div>
                    <div
                      className="resume-item p-2 dark:bg-[#111111] hover:transform hover:scale-105 cursor-pointer rounded-md space-x-2 flex flex-row items-center">
                      <Image
                        src={RoadmapIcon}
                        width={'60px'}
                        height='60px'

                      ></Image>
                      <div className="intro space-y-2  ">
                        <p className="text-base font-bold text-neutral-200">学习路线</p>
                        <p className="text-xs text-neutral-400">科学引导不走弯路</p>

                      </div>
                    </div>
                    <div
                      className="resume-item p-2 dark:bg-[#111111] hover:transform hover:scale-105 cursor-pointer rounded-md space-x-2 flex flex-row items-center">
                      <Image
                        src={ProgramIcon}
                        width={'60px'}
                        height='60px'

                      ></Image>
                      <div className="intro space-y-2  ">
                        <p className="text-base font-bold text-neutral-200">开发场景题</p>
                        <p className="text-xs text-neutral-400">面试必备先人一步</p>
                      </div>
                    </div>
                  </div>
                  <div className="job-column grid grid-rows-3 space-y-2">
                    <div className="column-section dark:bg-[#111111] rounded-lg p-4">
                      <h3 className="title text-sm font-bold text-neutral-300">编程圈子</h3>
                      <div className="item-list grid grid-cols-3 text-neutral-400 text-xs gap-2 mt-3">
                        <div className="info-item">Java</div>
                        <div className="info-item">Python</div>
                        <div className="info-item">C++</div>
                      </div>

                    </div>
                    <div className="column-section dark:bg-[#111111] rounded-lg p-4">
                      <h3 className="title text-sm font-bold text-neutral-300">职场面经</h3>
                      <div className="item-list grid grid-cols-3 text-neutral-400 text-xs gap-2 mt-3">
                        <div className="info-item">八股文</div>
                        <div className="info-item">项目面</div>
                        <div className="info-item">算法面</div>
                      </div>

                    </div>
                    <div className="column-section dark:bg-[#111111] rounded-lg p-4">
                      <h3 className="title text-sm font-bold text-neutral-300">编程圈子</h3>
                      <div className="item-list grid grid-cols-3 text-neutral-400 text-xs gap-2 mt-3">
                        <div className="info-item">Java</div>
                        <div className="info-item">Python</div>
                        <div className="info-item">C++</div>
                      </div>

                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </>
  )
}