import {User} from "@/models/user.types.ts";
import React from "react";
import UserAbbreviate from "@/components/user/user-abbreviate.tsx";
import {UserLineChart} from "@/views/forms/social-contact/components/user-line-chart.tsx";
import CircleAbbreviate from "@/views/circle/components/circle-abbreviate.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import ArticleAbbreviate from "@/components/article/article-abbreviate.tsx";
import SubjectAbbreviate from "@/views/subject/components/subject-abbreviate.tsx";
import {userAbbreviateInfo} from "@/mock/user.ts";
import {labelList} from "@/mock/label.ts";
import {circle} from "@/mock/circle.ts";
import {articleAbbreviateData} from "@/mock/article.ts";
import {mockSubject} from "@/mock/subject.ts";


interface Props {
  user: User
}

const UserProfile: React.FC<Props> = ({user}) => {


  return (

    <>
      <section className="left border-r space-y-3 pr-5">
        <div className="author-info">
          {/*  userAbbreviate*/}
          <UserAbbreviate
            user={userAbbreviateInfo}
            isFollowed={true}
            requiredFollow={true}
          ></UserAbbreviate>
        </div>
        <div className="user-info mt-2 py-0 text-xs text-default-400 overflow-hidden">
          <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
          <span className="pt-2">
               #FrontendWithZoey
              <span aria-label="computer" className="py-2" role="img">
                💻
              </span>
            </span>
        </div>
        <div className="user-label-list gap-2 mt-8 flex flex-wrap ">
          {Array.isArray(labelList) && labelList.length > 0 ? (
            labelList.map((label) => (
              <span
                key={label.id}
                className="p-1  text-xs border rounded-md px-2 inline-block "
              >{label.labelName}</span>
            ))
          ) : (
            <div className="empty w-full"></div>
          )}
        </div>
        <div className="pie-chart">
          {/*<UserPieChart></UserPieChart>*/}
        </div>
        <div className="user-data-charts mt-8">
          <UserLineChart></UserLineChart>
        </div>
        <div className="user-circle-list space-y-3">
          <CircleAbbreviate circle={circle}></CircleAbbreviate>
          <CircleAbbreviate circle={circle}></CircleAbbreviate>
          <CircleAbbreviate circle={circle}></CircleAbbreviate>
          <CircleAbbreviate circle={circle}></CircleAbbreviate>

        </div>
      </section>
      <section className="right">
        <Tabs defaultValue="article">
          <TabsList>
            <TabsTrigger value="article">article</TabsTrigger>
            <TabsTrigger value="subject">subject</TabsTrigger>
          </TabsList>
          <TabsContent value="article" className='space-y-3'>
            <ArticleAbbreviate article={articleAbbreviateData}></ArticleAbbreviate>
            <ArticleAbbreviate article={articleAbbreviateData}></ArticleAbbreviate>
            <ArticleAbbreviate article={articleAbbreviateData}></ArticleAbbreviate>
            <ArticleAbbreviate article={articleAbbreviateData}></ArticleAbbreviate>
            <ArticleAbbreviate article={articleAbbreviateData}></ArticleAbbreviate>
            <ArticleAbbreviate article={articleAbbreviateData}></ArticleAbbreviate>
            <ArticleAbbreviate article={articleAbbreviateData}></ArticleAbbreviate>
          </TabsContent>
          <TabsContent value="subject" className="space-y-3">
            <SubjectAbbreviate
              subject={mockSubject}
            ></SubjectAbbreviate>
            <SubjectAbbreviate
              subject={mockSubject}
            ></SubjectAbbreviate>
            <SubjectAbbreviate
              subject={mockSubject}
            ></SubjectAbbreviate>
            <SubjectAbbreviate
              subject={mockSubject}
            ></SubjectAbbreviate><SubjectAbbreviate
            subject={mockSubject}
          ></SubjectAbbreviate>


          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}

export default UserProfile