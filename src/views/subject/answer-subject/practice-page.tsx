import React, { useState, useEffect } from 'react';
import { Subject, mockSubjectList } from '@/models/subject.types.ts';
import { SingleChoiceSubject } from '@/components/subject/single-choice-subject.tsx';
import { MultipleChoiceSubject } from '@/components/subject/multiple-choice-subject.tsx';
import { TrueFalseSubject } from '@/components/subject/true-false-subject.tsx';
import { EssaySubject } from '@/components/subject/essay-subject.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable.tsx';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

interface SubjectAnswer {
  id: string;
  answer: string | string[] | boolean | null;
  isAnswered: boolean;
}

export function PracticePage() {
  // 使用模拟数据作为题目列表
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjectList);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<SubjectAnswer[]>([]);
  const [timeSpent, setTimeSpent] = useState<number>(0); // 以秒为单位
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // 初始化答案数组
  useEffect(() => {
    const initialAnswers = subjects.map(subject => ({
      id: subject.id,
      answer: null,
      isAnswered: false
    }));
    setAnswers(initialAnswers);
  }, [subjects]);

  // 计时器
  useEffect(() => {
    if (isSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isSubmitted]);

  // 格式化时间显示
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 计算完成进度
  const calculateProgress = (): number => {
    const answeredCount = answers.filter(answer => answer.isAnswered).length;
    return (answeredCount / subjects.length) * 100;
  };

  // 将选项数据转换为组件需要的格式
  const formatOptions = (subject: Subject | undefined) => {
    if (!subject || !subject.options) return [];
    
    return subject.options.map(option => {
      const optionIdParts = option.optionId.split('-');
      const lastPart = optionIdParts[optionIdParts.length - 1] || '';
      return {
        value: lastPart,
        label: option.optionContent
      };
    });
  };

  // 处理答案变更
  const handleAnswerChange = (answer: any) => {
    const currentSubject = subjects[currentIndex];
    if (!currentSubject) return;
    
    setAnswers(prev => prev.map(item => 
      item.id === currentSubject.id 
        ? { ...item, answer, isAnswered: true } 
        : item
    ));
  };

  // 切换到下一题
  const goToNextSubject = () => {
    if (currentIndex < subjects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 切换到上一题
  const goToPrevSubject = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 跳转到指定题目
  const goToSubject = (index: number) => {
    if (index >= 0 && index < subjects.length) {
      setCurrentIndex(index);
    }
  };

  // 提交答案
  const handleSubmit = () => {
    setIsSubmitted(true);
    // 这里可以添加提交到后端的逻辑
    console.log('提交的答案:', answers);
  };

  // 重置当前题目的答案
  const resetCurrentAnswer = () => {
    const currentSubject = subjects[currentIndex];
    if (!currentSubject) return;
    
    setAnswers(prev => prev.map(item => 
      item.id === currentSubject.id 
        ? { ...item, answer: null, isAnswered: false } 
        : item
    ));
  };

  // 渲染当前题目
  const renderCurrentSubject = () => {
    const currentSubject = subjects[currentIndex];
    if (!currentSubject) return null;
    
    const currentAnswer = answers.find(answer => answer.id === currentSubject.id);
    
    switch (currentSubject.subjectType) {
      case 1: // 单选题
        return (
          <SingleChoiceSubject
            subject={currentSubject}
            options={formatOptions(currentSubject)}
            showParse={isSubmitted}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 2: // 多选题
        return (
          <MultipleChoiceSubject
            subject={currentSubject}
            options={formatOptions(currentSubject)}
            showParse={isSubmitted}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 3: // 判断题
        return (
          <TrueFalseSubject
            subject={currentSubject}
            showParse={isSubmitted}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 4: // 简答题
        return (
          <EssaySubject
            subject={currentSubject}
            showParse={isSubmitted}
            onAnswerChange={handleAnswerChange}
            placeholder="请在此输入您的答案..."
            maxLength={500}
          />
        );
      default:
        return <div>未知题型</div>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      {/* 顶部进度条和计时器 */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex-1 mr-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">完成进度</span>
            <span className="text-sm font-medium">{Math.round(calculateProgress())}%</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>
        <div className="flex items-center bg-muted p-2 rounded-md">
          <Clock className="h-4 w-4 mr-2" />
          <span className="font-mono">{formatTime(timeSpent)}</span>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="min-h-[75vh] border rounded-lg">
        {/* 左侧题目导航 */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">题目列表</h2>
            <div className="grid grid-cols-5 gap-2">
              {subjects.map((subject, index) => {
                const answer = answers.find(a => a.id === subject.id);
                const isAnswered = answer?.isAnswered || false;
                const isCurrent = index === currentIndex;
                
                return (
                  <Button 
                    key={subject.id}
                    variant={isCurrent ? "default" : (isAnswered ? "outline" : "ghost")}
                    className={`h-10 w-10 p-0 ${isCurrent ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => goToSubject(index)}
                  >
                    <span className="text-xs">{index + 1}</span>
                    {isAnswered && !isCurrent && (
                      <CheckCircle2 className="h-3 w-3 absolute top-0 right-0 text-green-500" />
                    )}
                  </Button>
                );
              })}
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">题目类型说明</h3>
              <ul className="text-xs space-y-1">
                <li className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-blue-100 rounded-sm mr-2"></span>
                  <span>单选题</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-green-100 rounded-sm mr-2"></span>
                  <span>多选题</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-yellow-100 rounded-sm mr-2"></span>
                  <span>判断题</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-purple-100 rounded-sm mr-2"></span>
                  <span>简答题</span>
                </li>
              </ul>
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle />
        
        {/* 右侧答题区域 */}
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            {/* 题目内容区域 */}
            <ResizablePanel defaultSize={75} className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  第 {currentIndex + 1} 题 / 共 {subjects.length} 题
                </h2>
                <div className="flex items-center space-x-2">
                  {!isSubmitted && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={resetCurrentAnswer}
                    >
                      重置此题
                    </Button>
                  )}
                </div>
              </div>
              
              <div>
                  {renderCurrentSubject()}
              </div>

              {/* 当前答案显示 */}
              {!isSubmitted && (
                <div className="mt-4 text-sm text-muted-foreground">
                  {(() => {
                    const currentSubject = subjects[currentIndex];
                    if (!currentSubject) return null;
                    
                    const answer = answers.find(a => a.id === currentSubject.id);
                    if (!answer || !answer.isAnswered) return '未作答';
                    
                    switch (currentSubject.subjectType) {
                      case 1: // 单选题
                        return `当前选择: ${answer.answer || '未选择'}`;
                      case 2: // 多选题
                        return `当前选择: ${Array.isArray(answer.answer) && answer.answer.length > 0 ? answer.answer.join(', ') : '未选择'}`;
                      case 3: // 判断题
                        return `当前选择: ${answer.answer === null ? '未选择' : (answer.answer ? '正确' : '错误')}`;
                      case 4: // 简答题
                        return `当前回答字数: ${typeof answer.answer === 'string' ? answer.answer.length : 0}`;
                      default:
                        return null;
                    }
                  })()}
                </div>
              )}
            </ResizablePanel>
            
            <ResizableHandle />
            
            {/* 底部控制区域 */}
            <ResizablePanel defaultSize={25} className="p-4 border-t">
              <Tabs defaultValue="navigation" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="navigation">题目导航</TabsTrigger>
                  {isSubmitted && <TabsTrigger value="result">答题结果</TabsTrigger>}
                </TabsList>
                
                <TabsContent value="navigation" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={goToPrevSubject}
                      disabled={currentIndex === 0}
                    >

                      <ChevronLeft className="mr-2 h-4 w-4" />
                      previous
                    </Button>

                    <div className="flex space-x-2">
                      {!isSubmitted && (
                        <Button 
                          variant="default" 
                          onClick={handleSubmit}
                          disabled={answers.some(a => !a.isAnswered)}
                        >
                          提交答案
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        onClick={goToNextSubject}
                        disabled={currentIndex === subjects.length - 1}
                      >
                        next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {!isSubmitted && answers.some(a => !a.isAnswered) && (
                    <div className="flex items-center text-sm text-amber-600">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      您还有 {subjects.length - answers.filter(a => a.isAnswered).length} 题未完成，提交前请确保所有题目都已作答。
                    </div>
                  )}
                </TabsContent>
                
                {isSubmitted && (
                  <TabsContent value="result">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">答题结果</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground">总题数</div>
                          <div className="text-2xl font-bold">{subjects.length}</div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground">答题用时</div>
                          <div className="text-2xl font-bold">{formatTime(timeSpent)}</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        您已完成所有题目的作答，可以查看每道题的详细解析。
                      </p>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}