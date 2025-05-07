import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 导入分类数据
import { categories } from '@/components/subject/category-switcher';

import { Button } from '@/components/ui/button';

import { useToast } from '@/registry/hooks/use-toast';
import {AddSubjectDialog} from "@/components/subject/add-subject-dialog.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

// Mock data for subjects (replace with actual data fetching later)
const mockSubjects = [
  { id: 'subj-001', type: '单选题', content: 'React是什么？', options: ['库', '框架', '语言'], answer: '库' },
  { id: 'subj-002', type: '多选题', content: 'Vue的特点有哪些？', options: ['渐进式', '组件化', '虚拟DOM'], answer: ['渐进式', '组件化', '虚拟DOM'] },
  { id: 'subj-003', type: '判断题', content: 'TypeScript是JavaScript的超集。', answer: '正确' },
];

// Define the structure for a subject including ID (used for table data)
interface Subject {
  id: string;
  type: string;
  content: string;
  options?: string[];
  answer: string | string[];
  categoryId?: string; // 添加题目分类ID
  subjectParse?: string; // 添加题目解析字段
}

// Define Zod schema for form validation
const SubjectFormSchema = z.object({
    id: z.string().optional(), // ID is needed for editing
    type: z.enum(['单选题', '多选题', '判断题'], { required_error: '请选择题目类型' }),
    content: z.string().min(1, { message: '题干不能为空' }),
    // Use an array of 4 strings for options in the form, validate later based on type
    options: z.array(z.string()).length(4).optional(),
    answer: z.union([z.string(), z.array(z.string())]), // Allow string or array initially
    categoryId: z.string().optional(), // 题目所属分类ID
    subjectParse: z.string().optional() // 题目解析字段
}).superRefine((data, ctx) => {
    // Conditional validation based on type
    if (data.type === '单选题' || data.type === '多选题') {
        const validOptions = data.options?.filter(opt => opt.trim() !== '') ?? [];
        if (validOptions.length < 2) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['options'], // Target the options array itself
                message: '选择题至少需要两个有效选项',
            });
        }
        if (data.type === '单选题') {
            if (typeof data.answer !== 'string' || !data.answer.trim()) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['answer'], message: '单选题答案不能为空' });
            } else if (!validOptions.includes(data.answer)) {
                 // Optional: Validate answer is one of the options
                 // ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['answer'], message: '答案必须是有效选项之一' });
            }
        } else { // 多选题
            // Ensure answer is an array and has valid content
            const answerArray = Array.isArray(data.answer) ? data.answer : typeof data.answer === 'string' ? data.answer.split(',').map(s => s.trim()).filter(s => s) : [];
            if (answerArray.length === 0) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['answer'], message: '多选题答案不能为空' });
            } else if (answerArray.some(a => !validOptions.includes(a))) {
                // Optional: Validate answers are among the options
                // ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['answer'], message: '答案必须是有效选项之一' });
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

export function SubjectManagePage() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const { toast } = useToast(); // Initialize toast

  const form = useForm<SubjectFormData>({
    resolver: zodResolver(SubjectFormSchema),
    defaultValues: {
      id: undefined,
      type: '单选题',
      content: '',
      options: ['', '', '', ''],
      answer: '',
      categoryId: '',
      subjectParse: '',
    },
  });

  // Watch the type field to conditionally render options/answer inputs
  const watchedType = form.watch('type');

  // Reset form and dialog state
  const resetDialogState = () => {
    form.reset({
        id: undefined,
        type: '单选题',
        content: '',
        options: ['', '', '', ''],
        answer: '',
        categoryId: '',
        subjectParse: '',
        subjectParse: '',
    });
    setDialogMode('add');
    setIsDialogOpen(false);
  };

  // Handle form submission (for both add and edit)
  const onSubmit = (data: SubjectFormData) => {
    console.log('[onSubmit] Form Data:', data);

    // Process data before saving (e.g., filter empty options)
    const processedData: Omit<Subject, 'id'> & { id?: string } = {
        type: data.type,
        content: data.content,
        answer: data.answer,
        // Filter out empty options before saving for choice types
        options: (data.type === '单选题' || data.type === '多选题')
                 ? data.options?.filter(opt => opt && opt.trim() !== '')
                 : undefined,
        categoryId: data.categoryId,
        subjectParse: data.subjectParse,
    };

    if (dialogMode === 'add') {
        const newId = `subj-${String(subjects.length + 1).padStart(3, '0')}`;
        const subjectToAdd: Subject = { ...processedData, id: newId };
        setSubjects(prev => [...prev, subjectToAdd]);
        toast({ title: '成功', description: '题目已成功添加。' });
        console.log('Added Subject:', subjectToAdd);
    } else {
        // Update existing subject
        if (!data.id) {
            console.error('[onSubmit] Missing ID for update.');
            toast({ title: '错误', description: '缺少题目ID，无法更新。', variant: 'destructive' });
            return;
        }
        const subjectToUpdate: Subject = { ...processedData, id: data.id };
        setSubjects(prev => prev.map(subj => subj.id === data.id ? subjectToUpdate : subj));
        toast({ title: '成功', description: `题目 ${data.id} 已成功更新。` });
        console.log('Updated Subject:', subjectToUpdate);
    }

    resetDialogState();
  };

  // Prepare form for editing
  const handleEditClick = (subject: Subject) => {
    console.log('[handleEditClick] Subject to edit:', subject);
    setDialogMode('edit');
    // Ensure options has exactly 4 elements for the form, padding with empty strings
    const optionsForForm = [...(subject.options || [])];
    while (optionsForForm.length < 4) {
        optionsForForm.push('');
    }
    // Reset form with the subject's data
    form.reset({
        ...subject,
        options: optionsForForm.slice(0, 4),
        // Ensure answer format matches form expectation (string for single/true-false, array for multi)
        answer: subject.type === '多选题' ? (Array.isArray(subject.answer) ? subject.answer : []) : subject.answer,
        subjectParse: subject.subjectParse || '',
    });
    console.log('[handleEditClick] Form reset with:', {
        ...subject,
        options: optionsForForm.slice(0, 4),
        answer: subject.type === '多选题' ? (Array.isArray(subject.answer) ? subject.answer : []) : subject.answer,
        subjectParse: subject.subjectParse || '',
    });
    setIsDialogOpen(true);
  };

  const handleDeleteSubject = (id: string) => {
    if (window.confirm(`确定要删除题目 ${id} 吗？`)) {
        setSubjects(prev => prev.filter(subj => subj.id !== id));
        console.log('Deleted Subject:', id);
    }
  };

  const handleOpenAddDialog = () => {
    setDialogMode('add');
    // Reset form to default values for adding
    form.reset({
        id: undefined,
        type: '单选题',
        content: '',
        options: ['', '', '', ''],
        answer: '',
        categoryId: '',
        subjectParse: '',
        subjectParse: '',
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">题目管理</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={handleOpenAddDialog}>新增题目</Button>
        {/* Dialog for Add/Edit */}
        <AddSubjectDialog 
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={onSubmit}
          dialogMode={dialogMode}
          form={form}
        />
      </div>

      {/* Shadcn Table 实现 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>题干</TableHead>
              <TableHead>分类</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.id}</TableCell>
                <TableCell>{subject.type}</TableCell>
                <TableCell>{subject.content}</TableCell>
                <TableCell>
                  {subject.categoryId ? 
                    categories.find(cat => cat.value === subject.categoryId)?.label || subject.categoryId 
                    : 
                    "未分类"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(subject)} className="mr-2">
                    编辑
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteSubject(subject.id)}>
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}