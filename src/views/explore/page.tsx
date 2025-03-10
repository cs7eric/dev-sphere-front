import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiSearch2Line} from "react-icons/ri";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import ListPage from "@/views/home/subject-list.tsx";
import UserList from "@/components/user/user-list.tsx";
import ArticleList from "@/components/article/article-list.tsx";
import {Card} from "@/components/ui/card.tsx";
import AnimatedList from "@/components/list/animated-list.tsx";
import {FaHotjar} from "react-icons/fa";

export default function ExplorePage() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];
  return (
    <>

      <div className="explore-container flex flex-col justify-center">
        <div className="top-section flex justify-center">
          <div className="search-area mt-8 gap-4 flex">
            <Input className="w-180 h-12" placeholder="search for subjects、users or article"/>
            <Button className="h-12 px-1">
              <RiSearch2Line className="transform scale-120"/>
              <span className="font-bold">Search</span>
            </Button>
          </div>
        </div>
        <div className="main-section w-full flex items-center justify-center mt-20">
          <div className="area-wrap flex flex-col items-center justify-center px-10 w-full">
            <Tabs defaultValue="subject" className="w-full">
              <div className="tabs-header-container w-full sticky pl-24 top-20 bg-background z-10 pb-4">
                <TabsList className="tab-item justify-start">
                  <TabsTrigger value="subject">Subject</TabsTrigger>
                  <TabsTrigger value="user">User</TabsTrigger>
                  <TabsTrigger value="article">Article</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
              </div>

              <div className="tabs-content-container w-full">
                <TabsContent className="tab-item w-full" value="subject">
                  <div className="content-wrapper w-full">
                    <ListPage></ListPage>
                  </div>
                </TabsContent>
                <TabsContent className="tab-item w-full" value="user">
                  <div className="content-wrapper w-full">
                    <UserList></UserList>
                  </div>
                </TabsContent>
                <TabsContent className="tab-item flex justify-center " value="article">
                  <div className="content-wrapper flex w-9/11 space-x-9 justify-center ">
                    <ArticleList className="w-4/7"></ArticleList>
                    <Card className="w-3/7 ">

                      <div className="hot-title flex justify-start items-center space-x-2 pl-5">
                        <FaHotjar className="fill-red-600"/>
                        <h3 className="font-bold text-xl font-emblemaone text-red-600 " style={{fontFamily: 'emblemaone'}}>
                          Hot 100
                        </h3>
                      </div>

                      <AnimatedList
                        className="max-w-5xl "
                        items={items}
                        onItemSelect={(item, index) => console.log(item, index)}
                        showGradients={true}
                        enableArrowNavigation={true}
                        displayScrollbar={true}
                      />
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent className="tab-item w-full" value="group">
                  <div className="content-wrapper w-full">
                    <UserList></UserList>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

          </div>

        </div>
      </div>

    </>
  )
}