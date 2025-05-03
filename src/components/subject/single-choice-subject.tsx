import React, { useState } from 'react';
import { Subject } from '@/models/subject.types';
import { SubjectItem } from './subject-item';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SingleChoiceSubjectProps {
  subject: Subject;
  className?: string;
  showParse?: boolean;
  onAnswerChange?: (answer: string) => void;
  options?: Array<{ value: string; label: string }>;
}

export function SingleChoiceSubject({
  subject,
  className,
  showParse = false,
  onAnswerChange,
  options = [
    { value: 'A', label: '选项A' },
    { value: 'B', label: '选项B' },
    { value: 'C', label: '选项C' },
    { value: 'D', label: '选项D' },
  ],
}: SingleChoiceSubjectProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    if (onAnswerChange) {
      onAnswerChange(value);
    }
  };

  return (
    <SubjectItem subject={subject} className={className} showParse={showParse}>
      <div className="mt-4">
        <RadioGroup
          value={selectedValue}
          onValueChange={handleValueChange}
          className="space-y-3"
        >
          {options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`option-${option.value}`} />
              <Label htmlFor={`option-${option.value}`} className="cursor-pointer">
                {option.value}. {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </SubjectItem>
  );
}