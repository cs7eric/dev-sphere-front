import React, { useState } from 'react';
import { mockSubjectList, Subject } from '@/models/subject.types';
import { SingleChoiceSubject } from './single-choice-subject';
import { MultipleChoiceSubject } from './multiple-choice-subject';
import { TrueFalseSubject } from './true-false-subject';
import { EssaySubject } from './essay-subject';

export function SubjectDemo() {
  // 获取不同类型的题目示例
  const singleChoiceExample = mockSubjectList.find(subject => subject.subjectType === 1);
  const multipleChoiceExample = mockSubjectList.find(subject => subject.subjectType === 2);
  const trueFalseExample = mockSubjectList.find(subject => subject.subjectType === 3);
  const essayExample = mockSubjectList.find(subject => subject.subjectType === 4);

  // 存储用户答案
  const [singleAnswer, setSingleAnswer] = useState<string>('');
  const [multipleAnswers, setMultipleAnswers] = useState<string[]>([]);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState<boolean | null>(null);
  const [essayAnswer, setEssayAnswer] = useState<string>('');

  // 将选项数据转换为组件需要的格式
  const formatOptions = (subject: Subject | undefined) => {
    if (!subject || !subject.options) return [];
    
    return subject.options.map(option => {
      // 正确提取选项ID中的字母部分（如opt-001-A中的A）
      const optionIdParts = option.optionId.split('-');
      const lastPart = optionIdParts[optionIdParts.length - 1] || '';
      return {
        value: lastPart,
        label: option.optionContent
      };
    });
  };

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold mb-6">题目组件示例</h2>

      {/* 单选题示例 */}
      {singleChoiceExample && (
        <div>
          <h3 className="text-lg font-semibold mb-2">单选题示例</h3>
          <SingleChoiceSubject
            subject={singleChoiceExample}
            options={formatOptions(singleChoiceExample)}
            showParse={true}
            onAnswerChange={setSingleAnswer}
          />
          <div className="mt-2 text-sm">当前选择: {singleAnswer || '未选择'}</div>
        </div>
      )}

      {/* 多选题示例 */}
      {multipleChoiceExample && (
        <div>
          <h3 className="text-lg font-semibold mb-2">多选题示例</h3>
          <MultipleChoiceSubject
            subject={multipleChoiceExample}
            options={formatOptions(multipleChoiceExample)}
            showParse={true}
            onAnswerChange={setMultipleAnswers}
          />
          <div className="mt-2 text-sm">
            当前选择: {multipleAnswers.length > 0 ? multipleAnswers.join(', ') : '未选择'}
          </div>
        </div>
      )}

      {/* 判断题示例 */}
      {trueFalseExample && (
        <div>
          <h3 className="text-lg font-semibold mb-2">判断题示例</h3>
          <TrueFalseSubject
            subject={trueFalseExample}
            showParse={true}
            onAnswerChange={setTrueFalseAnswer}
          />
          <div className="mt-2 text-sm">
            当前选择: {trueFalseAnswer === null ? '未选择' : (trueFalseAnswer ? '正确' : '错误')}
          </div>
        </div>
      )}

      {/* 简答题示例 */}
      {essayExample && (
        <div>
          <h3 className="text-lg font-semibold mb-2">简答题示例</h3>
          <EssaySubject
            subject={essayExample}
            showParse={true}
            onAnswerChange={setEssayAnswer}
            placeholder="请简要描述C++中类与对象的概念和关系..."
            maxLength={500}
          />
          <div className="mt-2 text-sm">
            当前回答字数: {essayAnswer.length}
          </div>
        </div>
      )}
    </div>
  );
}