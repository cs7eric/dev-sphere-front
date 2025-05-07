import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { CategorySwitcher } from '@/components/subject/category-switcher';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/registry/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // 导入 RadioGroup
import { Checkbox } from "@/components/ui/checkbox";
import {TagsInput} from "@/components/input/tags-input.tsx"; // 导入 Checkbox

// 定义Zod验证规则
const SubjectFormSchema = z.object({
    id: z.string().optional(), // 添加 ID 以支持编辑
    type: z.enum(['单选题', '多选题', '判断题'], { required_error: '请选择题目类型' }),
    content: z.string().min(1, { message: '题干不能为空' }),
    options: z.array(z.string()).length(4).optional(),
    answer: z.union([z.string(), z.array(z.string())]),
    categoryId: z.string().optional(),
    subjectParse: z.string().optional(), // 添加题目解析字段
    tags: z.array(z.string()).optional(),
    score: z.number().min(0, { message: '分数不能小于0' }).max(100, { message: '分数不能大于100' })
}).superRefine((data, ctx) => {
    const validOptions = data.options?.map(opt => opt.trim()).filter(opt => opt !== '') ?? [];
    if (data.type === '单选题' || data.type === '多选题') {
        if (validOptions.length < 2) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['options'],
                message: '选择题至少需要两个有效选项',
            });
        }
        if (data.type === '单选题') {
            if (typeof data.answer !== 'string' || !data.answer.trim()) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['answer'], message: '单选题答案不能为空' });
            } else if (validOptions.length > 0 && !validOptions.includes(data.answer)) {
                 ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['answer'], message: '答案必须是有效选项之一' });
            }
        } else { // 多选题
            const answerArray = Array.isArray(data.answer) ? data.answer : [];
            if (answerArray.length === 0) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['answer'], message: '多选题答案不能为空' });
            } else if (validOptions.length > 0 && answerArray.some(a => !validOptions.includes(a))) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['answer'], message: '答案必须是有效选项之一' });
            }
        }
    } else if (data.type === '判断题') {
        if (data.answer !== '正确' && data.answer !== '错误') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['answer'],
                message: '判断题答案必须是 "正确" 或 "错误"',
            });
        }
    }
});

type SubjectFormData = z.infer<typeof SubjectFormSchema>;

interface AddSubjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: SubjectFormData) => void;
    dialogMode?: 'add' | 'edit';
    form?: any; // 使用any类型以接收外部传入的form对象
}

export function AddSubjectDialog({ open, onOpenChange, onSubmit, dialogMode = 'add', form: externalForm }: AddSubjectDialogProps) {
    const { toast } = useToast();

    const form = externalForm || useForm<SubjectFormData>({
        resolver: zodResolver(SubjectFormSchema),
        defaultValues: {
            id: undefined,
            type: '单选题',
            content: '',
            options: ['', '', '', ''],
            answer: '',
            categoryId: '',
            subjectParse: '', // 添加题目解析默认值
        },
    });

    const watchedType = form.watch('type');
    const watchedOptions = form.watch('options') || [];
    const validOptions = watchedOptions.map(opt => opt?.trim() ?? '').filter(opt => opt !== '');

    const handleSubmit = (data: SubjectFormData) => {
        console.log("[Dialog Submit] Data:", data);
        try {
            // 在这里处理多选题答案，确保是数组
            let processedData = { ...data };
            if (data.type === '多选题' && typeof data.answer === 'string') {
                // This case shouldn't happen with checkboxes, but as a fallback
                processedData.answer = data.answer.split(',').map(s => s.trim()).filter(s => s);
            } else if (data.type !== '多选题' && Array.isArray(data.answer)) {
                // This case shouldn't happen with radio/select, but as a fallback
                processedData.answer = data.answer[0] || '';
            }

            onSubmit(processedData);
            // 不在这里显示toast，让父组件处理
            // Reset is handled by parent component if externalForm is provided
            // if (!externalForm) {
            //     form.reset();
            // }
            // onOpenChange(false); // Closing is handled by parent
        } catch (error) {
            console.error("[Dialog Submit] Error:", error);
            toast({ title: '错误', description: dialogMode === 'add' ? '添加题目失败' : '更新题目失败', variant: 'destructive' });
        }
    };

    // Helper to render options for selection
    const renderAnswerOptions = (field: any) => {
        if (!validOptions || validOptions.length === 0) {
            return <p className="text-sm text-muted-foreground">请先在左侧填写有效选项。</p>;
        }

        if (watchedType === '单选题') {
            return (
                <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value as string}
                    className="space-y-1"
                >
                    {validOptions.map((option, index) => (
                        <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem value={option} />
                            </FormControl>
                            <FormLabel className="font-normal">{option}</FormLabel>
                        </FormItem>
                    ))}
                </RadioGroup>
            );
        }

        if (watchedType === '多选题') {
            const currentAnswers = Array.isArray(field.value) ? field.value : [];
            return (
                <div className="space-y-1">
                    {validOptions.map((option, index) => (
                        <FormItem key={index} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={currentAnswers.includes(option)}
                                    onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...currentAnswers, option])
                                            : field.onChange(currentAnswers.filter((value) => value !== option))
                                    }}
                                />
                            </FormControl>
                            <FormLabel className="font-normal">{option}</FormLabel>
                        </FormItem>
                    ))}
                </div>
            );
        }

        // Fallback or for other types (though should be handled by main render)
        return <Input placeholder="输入答案" {...field} value={field.value as string} />;
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
          {/* Removed DialogTrigger as it's handled by parent */}
          <DialogContent className="sm:max-w-[800px]">
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                      <DialogHeader className="mb-4">
                          <DialogTitle>{dialogMode === 'add' ? '新增题目' : '编辑题目'}</DialogTitle>
                          <DialogDescription>{dialogMode === 'add' ? '在这里填写新题目的详细信息。' : '在这里编辑题目的详细信息。'}</DialogDescription>
                      </DialogHeader>

                      <div className="grid grid-cols-2 gap-6">
                          {/* Left Column: Type, Category, Content, Options */}
                          <div>
                              {/* Type and Category */}
                              <div className="grid grid-cols-5 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                      <FormItem className="col-span-1">
                                          <FormLabel>类型</FormLabel>
                                          <Select onValueChange={(value) => {
                                              field.onChange(value);
                                              // Reset answer when type changes
                                              form.setValue('answer', value === '多选题' ? [] : '');
                                          }} value={field.value}>
                                              <FormControl>
                                                  <SelectTrigger>
                                                      <SelectValue placeholder="选择题目类型" />
                                                  </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                  <SelectItem value="单选题">单选题</SelectItem>
                                                  <SelectItem value="多选题">多选题</SelectItem>
                                                  <SelectItem value="判断题">判断题</SelectItem>
                                              </SelectContent>
                                          </Select>
                                          <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                      <FormItem className="col-span-4 ml-6">
                                          <FormLabel>题目分类</FormLabel>
                                          <FormControl>
                                              <CategorySwitcher
                                                value={field.value || ""}
                                                onValueChange={field.onChange}
                                              />
                                          </FormControl>
                                          <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                              </div>

                              {/* Content */}
                              <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                  <FormItem className="mt-4">
                                      <FormLabel>题干</FormLabel>
                                      <FormControl>
                                          <Textarea
                                            placeholder="输入题目内容..."
                                            className="resize-none"
                                            {...field}
                                          />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Options (Conditional) */}
                              <div className={'mt-4'}> {/* Increased margin-top */}
                                  {(watchedType === '单选题' || watchedType === '多选题') && (
                                    <FormItem>
                                        <FormLabel>选项</FormLabel>
                                        <FormControl>
                                            <div className="space-y-2">
                                                {[0, 1, 2, 3].map((index) => (
                                                  <FormField
                                                    key={index}
                                                    control={form.control}
                                                    name={`options.${index}` as const}
                                                    render={({ field }) => (
                                                      <FormItem className="flex items-center space-x-2">
                                                          <FormLabel className="w-8 text-right">{String.fromCharCode(65 + index)}.</FormLabel> {/* A. B. C. D. */}
                                                          <FormControl>
                                                              <Input placeholder={`选项 ${String.fromCharCode(65 + index)}`} {...field} />
                                                          </FormControl>
                                                          <FormMessage />
                                                      </FormItem>
                                                    )}
                                                  />
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormDescription>请填写至少两个有效选项。</FormDescription>
                                        {/* Display general options error if exists */}
                                        {form.formState.errors.options && typeof form.formState.errors.options.message === 'string' && (
                                          <p className="text-sm font-medium text-destructive">
                                              {form.formState.errors.options.message}
                                          </p>
                                        )}
                                    </FormItem>
                                  )}

                              </div>
                          </div>

                          {/* Right Column: Answer, Parse */}
                          <div>
                              {/* Answer (Conditional) */}
                              <FormField
                                control={form.control}
                                name="answer"
                                render={({ field }) => (
                                  <FormItem className="mt-0"> {/* Removed margin-top */}
                                      <FormLabel>答案</FormLabel>
                                      <FormControl>
                                          {watchedType === '判断题' ? (
                                            <Select
                                              onValueChange={field.onChange}
                                              value={field.value as string}
                                              defaultValue={field.value as string}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="选择答案" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="正确">正确</SelectItem>
                                                    <SelectItem value="错误">错误</SelectItem>
                                                </SelectContent>
                                            </Select>
                                          ) : (watchedType === '单选题' || watchedType === '多选题') ? (
                                            renderAnswerOptions(field) // Use helper function
                                          ) : (
                                            // Should not happen if type is selected
                                            <Input placeholder="请先选择题目类型" disabled />
                                          )}
                                      </FormControl>
                                      <FormDescription>
                                          {watchedType === '单选题' ? '请选择一个正确答案。' :
                                           watchedType === '多选题' ? '请选择所有正确答案。' :
                                           watchedType === '判断题' ? '选择正确或错误。' :
                                           '请先选择题目类型。'}
                                      </FormDescription>
                                      <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Parse */}
                              <FormField
                                control={form.control}
                                name="subjectParse"
                                render={({ field }) => (
                                  <FormItem className="mt-4">
                                      <FormLabel>题目解析</FormLabel>
                                      <FormControl>
                                          <Textarea
                                            placeholder="输入题目解析内容..."
                                            className="resize-none h-32" // Adjusted height
                                            {...field}
                                            value={field.value || ''} // Ensure value is not null/undefined
                                          />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                                )}
                              />
                          </div>
                      </div>

                      <DialogFooter className="mt-6">
                          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>取消</Button>
                          <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>保存</Button>
                      </DialogFooter>
                  </form>
              </Form>
          </DialogContent>
      </Dialog>
    );
}



