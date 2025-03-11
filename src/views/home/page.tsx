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
const items = ['Java', 'Python', 'React', 'Golang', 'Vue', 'C++', 'Java', 'Python', 'React', 'Golang', 'Vue', 'C++','Java', 'Python', 'React', 'Golang', 'Vue', 'C++','Java', 'Python']


export default function HomePage() {
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
                    <Card className="flex-1/4 mx-3 gap-2 p-5 dark:bg-[#262626] ">

                      <Image
                        src={JavaIcon}
                        width={'80px'}
                        height={'80px'}
                      ></Image>
                    </Card>
                    <Card className="flex-1/4 mx-3 justify-center gap-2 p-5 dark:bg-[#262626]">
                      <Image
                        src={PythonIcon}
                        width={'80px'}
                        height={'80px'}
                      ></Image>
                    </Card>
                    <Card className="flex-1/4 mx-3 gap-2 p-5 dark:bg-[#262626]">
                      <Image
                        src={CppIcon}
                        width={'80px'}
                        height={'80px'}
                      ></Image>

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

                          {items.map((item, index) => (
                            <div className="field-item hover:text-[#fff] text-[#a1a1a1] rounded-sm cursor-pointer text-sm p-1 hover:bg-[#262626]">{item}'{index}</div>
                          ))}

                        </div>


                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button>Change！</Button>
                      </CardFooter>
                    </Card>
                    {/*userList*/}
                    <Card className="mt-3 h-90"></Card>
                    {/*website*/}
                    <div className="mt-6 hover:text-[#fff] text-[#a1a1a1] rounded-sm cursor-pointer text-sm p-1 hover:bg-[#262626] ">
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
                          className="website-item p-2 text-[#a1a1a1] hover:bg-[#262626] cursor-pointer text-sm hover:text-[#fff] rounded-sm">联系邮箱: csq020611@gmail.com</div>
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
