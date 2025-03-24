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
import {mockSubjectList} from "@/models/subject.types.ts";
import SubjectAbbreviate from "@/views/subject/components/subject-abbreviate.tsx";
import { useState, useEffect } from "react";

// 模拟 API 请求函数
const searchSubjectsAPI = async (query: string) => {
  console.log('搜索题目:', query);
  // 模拟 API 请求延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, data: [...mockSubjectList].filter(s => s.title.includes(query)) };
};

const searchUsersAPI = async (query: string) => {
  console.log('搜索用户:', query);
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, data: [{ id: 1, name: `用户 ${query}` }] };
};

const searchArticlesAPI = async (query: string) => {
  console.log('搜索文章:', query);
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, data: [{ id: 1, title: `文章 ${query}` }] };
};

const searchPasswordsAPI = async (query: string) => {
  console.log('搜索密码:', query);
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, data: [{ id: 1, name: `密码 ${query}` }] };
};

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<string>("subject");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 执行搜索的函数
  const handleSearch = async () => {
    console.log("searchQuery", searchQuery) 
    console.log("activeTab", activeTab) 

    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      let response;
      
      switch (activeTab) {
        case "subject":
          console.log("subject")
          response = await searchSubjectsAPI(searchQuery);
          break;
        case "user":
          console.log("user")
          response = await searchUsersAPI(searchQuery);
          break;
        case "article":
          console.log("article")
          response = await searchArticlesAPI(searchQuery);
          break;
        case "password":
          console.log("password")
          response = await searchPasswordsAPI(searchQuery);
          break;
        default:
          response = { success: false, data: [] };
      }
      
      if (response.success) {
        setSearchResults(response.data);
        console.log(`${activeTab} 搜索结果:`, response.data);
      } else {
        console.error("搜索失败");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("搜索出错:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 当标签页改变时的处理函数
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (searchQuery.trim()) {
      // 如果已有搜索词，切换标签时自动执行新标签的搜索
      handleSearch();
    }
  };

  return (
    <>
      <div className="explore-container flex flex-col justify-center">
        <div className="top-section flex justify-center">
          <div className="search-area mt-8 gap-4 flex">
            <Input 
              className="w-180 h-12" 
              placeholder={`搜索${
                activeTab === "subject" ? "题目" : 
                activeTab === "user" ? "用户" :
                activeTab === "article" ? "文章" : "密码"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button 
              className="h-12 px-1"
              onClick={handleSearch}
              disabled={isLoading}
            >
              <RiSearch2Line className="transform scale-120"/>
              <span className="font-bold">{isLoading ? "搜索中..." : "搜索"}</span>
            </Button>
          </div>
        </div>
        <div className="main-section w-full flex items-center justify-center mt-20">
          <div className="area-wrap flex flex-col items-center justify-center px-10 w-full">
            <Tabs 
              defaultValue="subject" 
              className="w-full"
              onValueChange={handleTabChange}
              value={activeTab}
            >
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
                    <ListPage searchResults={activeTab === "subject" ? searchResults : []}></ListPage>
                  </div>
                </TabsContent>
                <TabsContent className="tab-item w-full" value="user">
                  <div className="content-wrapper w-full">
                    <UserList searchResults={activeTab === "user" ? searchResults : []}></UserList>
                  </div>
                </TabsContent>
                <TabsContent className="tab-item flex justify-center " value="article">
                  <div className="content-wrapper flex w-9/11 space-x-9 justify-center ">
                    <ArticleList 
                      className="w-4/7"
                      searchResults={activeTab === "article" ? searchResults : []}
                    ></ArticleList>
                    <Card className="w-3/7 ">
                      <div className="hot-title flex justify-start items-center space-x-2 pl-5">
                        <FaHotjar className="fill-red-600"/>
                        <h3 className="font-bold text-xl font-emblemaone text-red-600 " style={{fontFamily: 'emblemaone'}}>
                          Hot 100
                        </h3>
                      </div>

                      <AnimatedList
                        className="max-w-5xl "
                        items={mockSubjectList}
                        itemType='subject'
                        onItemSelect={(item, index) => console.log(item, index)}
                        showGradients={true}
                        enableArrowNavigation={true}
                        displayScrollbar={true}
                      />
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent className="tab-item w-full" value="password">
                  <div className="content-wrapper w-full">
                    <UserList searchResults={activeTab === "password" ? searchResults : []}></UserList>
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