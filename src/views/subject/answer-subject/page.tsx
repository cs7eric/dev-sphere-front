import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx"


import {Button} from "@/components/ui/button.tsx";
import React, {useState} from "react";
import SubjectItem from "@/views/subject/components/subject-item.tsx";
import {Subject} from "@/models/subject.types.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ChevronLeft, ChevronRight} from "lucide-react";



const AnswerSubjectPage:React.FC = () => {

  const fakeSubjectData: Subject = {
    id: '1',
    subjectName: 'What is the capital of France?',
    subjectDifficult: 2, // 假设难度为 2
    settleName: 'Geography',
    subjectType: 1, // 单选
    subjectScore: 5,
    subjectParse: 'The capital of France is Paris.',
    createdBy: 'admin',
    createdTime: new Date('2023-01-01T12:00:00Z'),
    updateBy: 'admin',
    updateTime: new Date('2023-01-10T12:00:00Z'),
    isDeleted: 0 // 表示没有被删除
  };


  const [subjectInfo, setSubjectInfo] = useState<Subject>(fakeSubjectData)

  const updateSubject = () => {
    setSubjectInfo({
      ...fakeSubjectData
    })
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
                onClick={() => {console.log('2')}}
              >Parse</TabsTrigger>
            </TabsList>
            <TabsContent className='min-w-full' value="subjectInfo">
              <SubjectItem subject={subjectInfo}></SubjectItem>
            </TabsContent>
            <TabsContent className='min-w-full' value="subjectParse">
            </TabsContent>
          </Tabs>




        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel defaultSize={84}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={5}>
              <div className="flex h-full items-center justify-center gap-4 p-6">
                <Button variant="outline" size="icon">
                  <ChevronLeft />

                </Button>
                <Button
                  className="p-4 h-8 w-20 font-semibold"
                  variant='outline'
                >reset</Button>
                <Button className="p-4 h-8 w-20 font-semibold" variant="secondary" >collect</Button>

                <Button className="p-4 h-8 w-20 font-semibold">submit</Button>
                <Button variant="outline" size="icon">
                  <ChevronRight />

                </Button>
              </div>
            </ResizablePanel>
            <ResizableHandle/>
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <Textarea
                  className={'h-full'}
                  placeholder="Type your answer here." />

              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}


export default AnswerSubjectPage