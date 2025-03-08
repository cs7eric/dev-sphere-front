import {Image} from "@unpic/react"
import {Button} from "@/components/ui/button"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {MainNav} from "@/views/home/components/main-nav"
import {Search} from "@/views/home/components/search"
import {UserNav} from "@/views/home/components/user-nav"
import TextPressure from "@/components/text/TextPressure.tsx";
import TeamSwitcher from "@/views/home/components/team-switcher.tsx";
import {LanguageSwitcher} from "@/views/home/components/language-switcher.tsx";
import {Card} from "@/components/ui/card.tsx";
import {LabelList} from "@/components/subject/label-list.tsx";
import ListPage from "@/views/home/subject-list.tsx";


export default function HomePage() {
  return (
    <>

      <div className="md:hidden ">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher/>
            <MainNav className="mx-6"/>
            <div className="ml-auto flex items-center space-x-4">
              <Search/>
              <UserNav/>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
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
              <TabsTrigger value="analytics" className="cursor-pointer">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" className="cursor-pointer">
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" className="cursor-pointer">
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">

              <div className="container-items flex ">
                <div className="left-section flex-4/5  border-[#262626] w-full   p-6">
                  <div className="recommend-list flex ">
                    <Card className="flex-1/4 mx-3 ">
                      <h3 className="font-bold text-3xl text-center  ">
                        Java
                      </h3>
                    </Card>
                    <Card className="flex-1/4 mx-3 justify-center ">
                      <h3 className="font-bold text-3xl text-center justify-center ">
                        Java
                      </h3>
                    </Card>
                    <Card className="flex-1/4 mx-3 ">
                      <h3 className="font-bold text-3xl text-center  ">
                        Java
                      </h3>
                    </Card>


                  </div>
                  <LabelList ></LabelList>
                  <ListPage></ListPage>

                </div>
                <div className="right-section flex-1/5 bg-[#282828] rounded-xl w-full  p-6">
                  div
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              analytics
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              reports
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              notifications
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </>
  )
}
