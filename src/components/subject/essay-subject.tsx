import React, { useState } from 'react';
import { Subject } from '@/models/subject.types';
import { SubjectItem } from './subject-item';
import { Textarea } from '@/components/ui/textarea';

interface EssaySubjectProps {
  subject: Subject;
  className?: string;
  showParse?: boolean;
  onAnswerChange?: (answer: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export function EssaySubject({
  subject,
  className,
  showParse = false,
  onAnswerChange,
  placeholder = '请在此输入您的答案...',
  maxLength = 1000,
}: EssaySubjectProps) {
  const [answer, setAnswer] = useState<string>('');

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAnswer(value);
    if (onAnswerChange) {
      onAnswerChange(value);
    }
  };

  return (
    <SubjectItem subject={subject} className={className} showParse={showParse}>
      <div className="mt-4 space-y-2">
        <Textarea
          placeholder={placeholder}
          value={answer}
          onChange={handleValueChange}
          className="min-h-32 resize-y"
          maxLength={maxLength}
        />
        <div className="flex justify-end">
          <span className="text-xs text-gray-500">
            {answer.length}/{maxLength}
          </span>
        </div>
      </div>
    </SubjectItem>
  );
}