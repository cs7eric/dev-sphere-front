import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {LuThermometerSun} from "react-icons/lu";
import React, {useEffect, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "@/registry/hooks/use-toast.ts";
import {useLoader} from "@/hooks/use-loader.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import ComboboxArea from "@/components/input/combobox-area.tsx";
import {queryPrimaryCategoryUsingPost} from "@/apis/subject";
import { BiSolidCategory } from "react-icons/bi";
export function MomentDialog() {
  const [value, setValue] = useState("**Hello World!**");
  const {showGlobalLoader, hideGlobalLoader} = useLoader()
  const MomentFormSchema = z.object({
    momentTitle: z.string().min(2, {
      message: "circleName must be at least 2 characters.",
    }),
    content: z.string().nonempty(),
    category: z.string().nonempty()

  })


  const momentForm = useForm<z.infer<typeof MomentFormSchema>>({
    resolver: zodResolver(MomentFormSchema),
    defaultValues: {
      momentTitle: "",
    },
  })

  function onSubmit(data: z.infer<typeof MomentFormSchema>) {

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

  const [circleCategoryList, setCircleCategoryList] = useState()<[]>

  const fetchCircleList = async () => {
    const body = {
      categoryType: 1
    }
    const res = await queryPrimaryCategoryUsingPost({body})
    if (res.success) {
      setCircleCategoryList(res.data)
    }
  }


  useEffect(() => {

    fetchCircleList()
  }, []);



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={'h-12 font-semibold'}
        >
          <LuThermometerSun/>
          Boom!
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Moment Capture</DialogTitle>
          <DialogDescription>
            Record your current moments here. Share what you're experiencing right now!
          </DialogDescription>
        </DialogHeader>
        <Form
          {...momentForm}
        >
          <form
            className={'space-y-6'}
            onSubmit={momentForm.handleSubmit(onSubmit)}>

            <div className="grid grid-cols-7 space-x-4 ">
              <div className={'col-span-5'}>
                <FormField
                  name="momentTitle"
                  control={momentForm.control}
                  render={({field}) => (

                    <FormItem className="grid grid-cols-5 items-center gap-2">
                      <FormLabel className={'col-span-1 text-right'}>
                        MomentTitle
                      </FormLabel>
                      <FormControl className={'col-span-4'}>
                        <Input
                          id="name"
                          defaultValue="Pedro Duarte"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>


                  )}
                />
              </div>


              <div className="col-span-2 flex justify-end">
                <FormField
                  className={'grid'}
                  name="category"
                  control={momentForm.control}
                  render={({field}) => (

                    <FormItem className="flex justify-between items-center gap-2">
                      <FormLabel className={' flex justify-start mr-5'}>
                        <BiSolidCategory className={'fill-neutral-50 scale-150'}/>
                      </FormLabel>
                      <FormControl className={' flex justify-end'}>
                        <ComboboxArea
                          list={circleCategoryList}
                          {...field}
                        ></ComboboxArea>
                      </FormControl>
                    </FormItem>




                  )}
                />
              </div>

            </div>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                name="content"
                control={momentForm.control}
                render={({field}) => (
                  <FormItem className="grid grid-cols-5 items-center gap-2">

                    <FormControl className="col-span-5 !bg-neutral-950">
                      <MDEditor
                        className="w-full h-screen bg-neutral-500"
                        {...field}
                        hideToolbar={true}
                        preview={'edit'}
                        previewOptions={{rehypePlugins: [[rehypeSanitize]]}}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Save changes</Button>

          </form>

        </Form>

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
