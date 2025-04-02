import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import React, {useEffect, useState} from "react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "@/registry/hooks/use-toast.ts";
import {useLoader} from "@/hooks/use-loader.ts";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import {queryPrimaryCategoryUsingPost} from "@/apis/subject";
import { TbWritingSign } from "react-icons/tb";
import { FaDraftingCompass } from "react-icons/fa";
import { BsSendArrowUp } from "react-icons/bs";
import { RiResetLeftFill } from "react-icons/ri";
export function ArticleDialog() {
  const {showGlobalLoader, hideGlobalLoader} = useLoader()
  const ArticleFormSchema = z.object({
    articleTitle: z.string().min(2, {
      message: "circleName must be at least 2 characters.",
    }),
    content: z.string().nonempty(),
    category: z.string().nonempty()

  })


  const articleForm = useForm<z.infer<typeof ArticleFormSchema>>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      articleTitle: "",
    },
  })

  function onSubmit(data: z.infer<typeof ArticleFormSchema>) {

    showGlobalLoader()
    setTimeout(() => {
      hideGlobalLoader();
    }, 5000);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  const handleReset = () => {
    articleForm.reset('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={'h-12 font-semibold'}
        >

          <TbWritingSign />
          Write
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-8xl">

        <Form
          {...articleForm}
        >
          <form
            className={'space-y-6'}
            onSubmit={articleForm.handleSubmit(onSubmit)}>

            <div className="grid grid-cols-7 space-x-4 ">
              <div className={'col-span-5'}>
                <FormField
                  name="articleTitle"
                  control={articleForm.control}
                  render={({field}) => (

                    <FormItem className="grid grid-cols-5 items-center gap-2">

                      <FormControl className={'col-span-4'}>
                        <Input
                          className="!text-xl font-semibold placeholder:text-xl placeholder:font-light border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          id="name"
                          placeholder={"place text the title of your article"}
                          defaultValue=""
                          {...field}
                        />
                      </FormControl>
                    </FormItem>


                  )}
                />
              </div>


              <div className="col-span-2 space-x-4 mr-5 flex justify-end">
                <Button type={'submit'}>
                  <BsSendArrowUp />
                  publish
                </Button>
                <Button variant='outline'>
                  <FaDraftingCompass/>draft
                </Button>
                <Button
                  variant='ghost'
                  onClick={handleReset}
                >
                  <RiResetLeftFill />
                  reset
                </Button>

              </div>

            </div>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                name="content"
                control={articleForm.control}
                render={({field}) => (
                  <FormItem className="grid grid-cols-5 items-center gap-2">

                    <FormControl className="col-span-5 !bg-neutral-950">
                      <MDEditor
                        {...field}
                        data-color-mode={'dark'}
                        height={'85vh'}
                        previewOptions={{
                          rehypePlugins: [[rehypeSanitize]],
                          wrapperProps: {
                            style: {
                              backgroundColor: '#fff'
                            }
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>


          </form>

        </Form>

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
