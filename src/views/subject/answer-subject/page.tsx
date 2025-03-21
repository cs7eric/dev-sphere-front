import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx"


import {Button} from "@/components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import SubjectItem from "@/views/subject/components/subject-item.tsx";
import {Subject} from "@/models/subject.types.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useParams} from "react-router-dom";
import {getSubjectInfoUsingPost, SubjectInfoDTO} from "@/apis/subject";
import Loader from "@/components/styled/loader.tsx";
import Skeleton from "@/components/skeleton/skeleton.tsx";

interface Props {
  subject: Subject
}


const AnswerSubjectPage: React.FC<Props> = ({subject}) => {
  const {subjectId} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [subjectInfo, setSubjectInfo] = useState<Subject>(null)
  const fetchSubjectInfoData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await getSubjectInfoUsingPost({
        body: {id: subjectId}
      })

      if (!response.success) {
        throw new Error('Failed to fetch subject info')
      }

      setSubjectInfo(response.data || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    fetchSubjectInfoData()

    return () => {
      abortController.abort()
    }
  }, [subjectId])  // 当 subjectId 变化时重新获取

  const renderContent = () => {
    if (isLoading) {
      return <div className="space-y-4 p-4">

        <Skeleton rows={2}/>
      </div>
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="text-red-500">错误：{error}</p>
          <Button
            size='sm'
            variant="outline"
            onClick={fetchSubjectInfoData}
          >
            重试
          </Button>
        </div>
      )
    }

    if (!subjectInfo) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">暂无题目信息</p>
        </div>
      )
    }

    return <SubjectItem subject={subjectInfo}/>
  }

  return (

    <div className="p-[20px] w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="mt-[8vm] m-10px rounded-lg border min-h-[80vh] min-w-[95vw]"
      >
        <ResizablePanel defaultSize={20} className="w-full min-w-30vw p-4">
          <Tabs defaultValue="subjectInfo" className="w-full">
            <TabsList className="grid w-[150px] grid-cols-2 font-semibold">
              <TabsTrigger className={'font-semibold'} value="subjectInfo">Info</TabsTrigger>
              <TabsTrigger
                className={'font-semibold'}
                value="subjectParse"
                onClick={() => {
                  console.log('2')
                }}
              >Parse</TabsTrigger>
            </TabsList>
            <TabsContent className='min-w-full' value="subjectInfo">
              {renderContent()}

            </TabsContent>
            <TabsContent className='min-w-full' value="subjectParse">
              <p>{subjectInfo?.subjectParse}</p>
            </TabsContent>
          </Tabs>


        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel defaultSize={84}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={5}>
              <div className="flex h-full items-center justify-center gap-4 p-6">
                <Button variant="outline" size="icon">
                  <ChevronLeft/>

                </Button>
                <Button
                  className="p-4 h-8 w-20 font-semibold"
                  variant='outline'
                >reset</Button>
                <Button className="p-4 h-8 w-20 font-semibold" variant="secondary">collect</Button>

                <Button className="p-4 h-8 w-20 font-semibold">submit</Button>
                <Button variant="outline" size="icon">
                  <ChevronRight/>

                </Button>
              </div>
            </ResizablePanel>
            <ResizableHandle/>
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <Textarea
                  className={'h-full'}
                  placeholder="Type your answer here."/>

              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}


export default AnswerSubjectPage