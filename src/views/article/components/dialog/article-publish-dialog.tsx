// components/article-publish-dialog.tsx
import {Button} from "@/components/ui/button";
import {BsSendArrowUp} from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import MDEditor from "@uiw/react-md-editor";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useForm, UseFormReturn} from "react-hook-form";
import CircleSwitcher from "@/components/circle/circle-switcher.tsx";
import {mockShareCircles} from "@/mock/circle.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem, FormLabel,
} from "@/components/ui/form.tsx";
import {toast} from "@/registry/hooks/use-toast.ts";
import {useLoader} from "@/hooks/use-loader.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {TagsInput} from "@/components/input/tags-input.tsx";
import React from "react";
import { GiSpellBook } from "react-icons/gi";
import NullIcon from '@/assets/illstructions/null.svg'

interface Props {
  onPublish: () => void;
  articleForm: UseFormReturn<{
    articleTitle: string;
    content: string;
  }>;
}

interface ArticleDTO {
  articleTitle: string;
  content: string;
  label: string;
  authorId: number;
  circleId: number;
}


const ArticlePublishDialog = ({onPublish, articleForm}: Props) => {
  // 使用内部状态管理内容
  const currentTitle = articleForm.watch('articleTitle');
  const currentContent = articleForm.watch('content');

  const ArticleFormSchema = z.object({
    circleName: z.string().nonempty({
      message: "圈子名称不能为空"
    }),
    abstract: z.string().nonempty({
      message: "摘要不能为空"
    }),
    tags: z.array(z.string()).max(6, "最多只能添加5个标签").optional()
  })

  const articleFormPro = useForm<z.infer<typeof ArticleFormSchema>>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      circleName: '',
      articleTitle: currentTitle || '',
      content: currentContent || '',
      abstract: '',
      tags: []
    }
  })

  const {showGlobalLoader, hideGlobalLoader} = useLoader()

  const onSubmit = (data: z.infer<typeof ArticleFormSchema>) => {


    // 合并父表单的数据
    const formData = {
      ...data,
      articleTitle: currentTitle,
      content: currentContent
    }
    // 检查父表单的必填字段
    if (!formData.articleTitle || !formData.content) {
      toast({
        title: "提交失败",
        description: "请填写完整文章标题和内容",
        variant: "destructive"
      })
      return
    }
    showGlobalLoader()
    setTimeout(() => {
      hideGlobalLoader();
    }, 2000);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
        </pre>
      ),
    })
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <BsSendArrowUp/>
          publish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] md:max-w-6xl ">

        <Form
          {...articleFormPro}
        >
          <form onSubmit={articleFormPro.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="grid grid-cols-14 gap-4">
              <div className="preview-md  col-span-9 ">
                <h2 className="text-xl font-semibold">{currentTitle || "Untitled"}</h2>
                <ScrollArea className="h-[620px] border-t mt-5 w-full rounded-md">
                  {currentContent ? (
                    <MDEditor.Markdown
                      key={currentContent}
                      source={currentContent}
                      className="text-sm text-neutral-300 leading-8"
                      style={{
                        background: "#0a0a0a",
                        padding: "16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[460px]" style={{
                      background: "#0a0a0a",
                      padding: "16px",
                      borderRadius: "8px",
                      minHeight: "200px"
                    }}>
                      <img
                        src={NullIcon}
                        alt="Empty content"
                        className="w-32 h-32 opacity-50" // 调整大小和透明度
                      />
                      <p className="mt-4 text-neutral-400 text-sm">暂无内容</p>
                    </div>
                  )}
                </ScrollArea>
              </div>
              <div className="col-span-5 flex flex-col rounded-xl mr-2 p-4 bg-[#131313] justify-between">
                <div className={'flex space-y-3 flex-col'}>
                  <div className="publish-title">
                    <div className="flex space-x-2 items-center">
                      <GiSpellBook/>
                      <h3 className="font-semibold">Complete it!</h3>

                    </div>
                  </div>
                  <div className="circle-switcher mt-4">
                    <FormField
                      className='md:w-auto'
                      control={articleFormPro.control}
                      name="circleName"
                      render={({field}) => (
                        <div className='flex items-start gap-4 '>
                          <FormItem>
                            <FormLabel className={'text-right'}>Circle Name</FormLabel>
                            <FormControl>
                              <CircleSwitcher
                                {...field}
                                list={mockShareCircles}/>
                            </FormControl>
                            <FormDescription>Choose one circle to publish.</FormDescription>
                          </FormItem>
                        </div>
                      )}
                    />
                  </div>
                  <div className={'tags-area'}>
                    <FormField
                      control={articleFormPro.control}
                      name='tags'
                      render={({field}) => (
                        <FormItem>

                          <FormControl>
                            <div className="tags-input border-t pt-4 mt-2">
                              <TagsInput
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder="input tags..."
                                maxTags={5}
                                maxLength={15}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>No more than 5 tags</FormDescription>


                        </FormItem>


                      )}
                    />
                  </div>
                  <div className={'abstract-area'}>
                    <FormField
                      control={articleFormPro.control}
                      name='abstract'
                      render={({field}) => (
                        <FormControl>
                          <div>
                            <Textarea
                              className="resize-none mt-2 min-h-[150px]"
                              draggable={false}
                              placeholder={'这篇文章讲的大概是什么呢?'}
                              {...field}
                            />
                          </div>

                        </FormControl>
                      )}
                    />
                  </div>
                </div>

                <Button type='submit' variant='outline' className="mt-4">
                  <BsSendArrowUp className="mr-2"/>
                  Confirm Publish
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ArticlePublishDialog;