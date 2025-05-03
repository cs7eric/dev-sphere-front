import React, { useState } from 'react';
import { Subject } from '@/models/subject.types';
import { SubjectItem } from './subject-item';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FaCheck, FaTimes } from 'react-icons/fa';
interface TrueFalseSubjectProps {
  subject: Subject;
  className?: string;
  showParse?: boolean;
  onAnswerChange?: (answer: boolean) => void;
}

export function TrueFalseSubject({
  subject,
  className,
  showParse = false,
  onAnswerChange,
}: TrueFalseSubjectProps) {
  const [isTrue, setIsTrue] = useState<boolean>(false);

  const handleValueChange = (checked: boolean) => {
    setIsTrue(checked);
    if (onAnswerChange) {
      onAnswerChange(checked);
    }
  };

  return (
    <SubjectItem subject={subject} className={className} showParse={showParse}>
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="true-false-switch" className="text-base font-medium">
            {isTrue ? <FaCheck/> : <FaTimes/>}
          </Label>
          <Switch
            id="true-false-switch"
            checked={isTrue}
            onCheckedChange={handleValueChange}
          />
        </div>
        <p className="text-sm text-gray-500">
          {isTrue ? '我认为这个说法是正确的' : '我认为这个说法是错误的'}
        </p>
      </div>
    </SubjectItem>
  );
}