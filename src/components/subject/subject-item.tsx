import React from 'react';
import { Subject } from '@/models/subject.types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface SubjectItemProps {
  subject: Subject;
  className?: string;
  showParse?: boolean;
  onAnswerChange?: (answer: any) => void;
  children?: React.ReactNode;
}

export function SubjectItem({
  subject,
  className,
  showParse = false,
  onAnswerChange,
  children
}: SubjectItemProps) {
  // 根据难度级别返回不同的颜色
  const getDifficultyColor = (level?: number) => {
    if (!level) return 'bg-gray-200 text-gray-700';
    
    switch (level) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-orange-100 text-orange-800';
      case 5: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  // 根据题目类型返回对应的类型名称
  const getSubjectTypeName = (type?: 1 | 2 | 3 | 4) => {
    switch (type) {
      case 1: return '单选题';
      case 2: return '多选题';
      case 3: return '判断题';
      case 4: return '简答题';
      default: return '未知类型';
    }
  };

  return (
    <Card className={cn('w-full !border-0 shadow-none bg-neutral-200/30', className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1.5">
          <h3 className="font-semibold leading-none tracking-tight">
            {subject.subjectName || '未命名题目'}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {subject.labelName?.map((label, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className={getDifficultyColor(subject.subjectDifficult)}>
            难度: {subject.subjectDifficult || '未知'}
          </Badge>
          <Badge variant="outline">
            {getSubjectTypeName(subject.subjectType)}
          </Badge>
          {subject.subjectScore && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {subject.subjectScore}分
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* 渲染传入的子组件内容（题目内容和答题区域） */}
        {children}
      </CardContent>
      {showParse && subject.subjectParse && (
        <CardFooter className="flex flex-col items-start border-t pt-4">
          <h4 className="font-medium text-sm mb-1">题目解析:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{subject.subjectParse}</p>
        </CardFooter>
      )}
    </Card>
  );
}