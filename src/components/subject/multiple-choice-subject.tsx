import React, { useState } from 'react';
import { Subject } from '@/models/subject.types';
import { SubjectItem } from './subject-item';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface MultipleChoiceSubjectProps {
  subject: Subject;
  className?: string;
  showParse?: boolean;
  onAnswerChange?: (answers: string[]) => void;
  options?: Array<{ value: string; label: string }>;
}

export function MultipleChoiceSubject({
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
}: MultipleChoiceSubjectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleValueChange = (value: string, checked: boolean) => {
    let newSelectedValues: string[];
    
    if (checked) {
      newSelectedValues = [...selectedValues, value];
    } else {
      newSelectedValues = selectedValues.filter(v => v !== value);
    }
    
    setSelectedValues(newSelectedValues);
    
    if (onAnswerChange) {
      onAnswerChange(newSelectedValues);
    }
  };

  return (
    <SubjectItem subject={subject} className={className} showParse={showParse}>
      <div className="mt-4 space-y-3">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox 
              id={`option-${option.value}`} 
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) => handleValueChange(option.value, checked as boolean)}
            />
            <Label htmlFor={`option-${option.value}`} className="cursor-pointer">
              {option.value}. {option.label}
            </Label>
          </div>
        ))}
      </div>
    </SubjectItem>
  );
}