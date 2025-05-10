import {Button} from "@/components/ui/button.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {Input} from "@/components/ui/input.tsx"
import {LuThermometerSun} from "react-icons/lu";
import React, {useEffect, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "@/registry/hooks/use-toast.ts";
import {useLoader} from "@/hooks/use-loader.ts";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import { BiSolidCategory } from "react-icons/bi";
import {getStoredUserInfo} from "@/utils/user.ts";
import {addUsingPost2, getSubscribeListByUserIdUsingPost} from "@/apis/circle";
import CircleSwitcher from "@/components/circle/circle-switcher.tsx";
export function MomentDialog() {

  const [isOpen, setIsOpen] = useState(false)


  const {showGlobalLoader, hideGlobalLoader} = useLoader()
  const MomentFormSchema = z.object({
    momentTitle: z.string().min(2, {
      message: "circleName must be at least 2 characters.",
    }),
    content: z.string().nonempty(),
    circleId: z.number({
      message: "Category is required"
    })
  })


  const momentForm = useForm<z.infer<typeof MomentFormSchema>>({    
    resolver: zodResolver(MomentFormSchema),
    defaultValues: {
      momentTitle: "",
      content: "",
      circleId: ""
    },
  })

  async function onSubmit(data: z.infer<typeof MomentFormSchema>) {
    showGlobalLoader()

    const userInfo = getStoredUserInfo()

    const body = {
      momentTitle: data.momentTitle,
      circleId: data.circleId,
      content: data.content,
      userName: userInfo.loginId
    }

    const res = await addUsingPost2({body})
    if (res.success) {
      hideGlobalLoader();
      toast({
        title: "success",
        description: "发表成功"
      })
      momentForm.reset()
      setIsOpen(false)
    } else {
      hideGlobalLoader();
    }
    hideGlobalLoader();

  }

  const [circleCategoryList, setCircleCategoryList] = useState()<[]>
  const userInfo = getStoredUserInfo()

  const fetchCircleList = async () => {
    const body = {
      userName: userInfo.loginId
    }
    const res = await getSubscribeListByUserIdUsingPost({body})
    if (res.success) {
      setCircleCategoryList(res.data)
    }
  }


  useEffect(() => {

    fetchCircleList()
  }, []);





  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                          placeholder="Enter your moment title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>

                    </FormItem>


                  )}
                />
              </div>


              <div className="col-span-2 flex justify-end">
                <FormField
                  className={'grid'}
                  name="circleId"
                  control={momentForm.control}
                  render={({field}) => (

                    <FormItem className="flex justify-between items-center gap-2">
                      <FormLabel className={' flex justify-start mr-5'}>
                        <BiSolidCategory className={'fill-neutral-50 scale-150'}/>
                      </FormLabel>
                      <FormControl className={' flex justify-end'}>
                        {circleCategoryList.length > 0 ? (
                          <CircleSwitcher
                            {...field}
                            list={circleCategoryList}/>
                        ) : null}
                      </FormControl>
                      <FormMessage/>
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

                    <FormControl data-color-mode={"light"} className="col-span-5 ">
                      <MDEditor
                        className="w-full h-screen "
                        {...field}
                        hideToolbar={true}
                        preview={'edit'}
                        previewOptions={{rehypePlugins: [[rehypeSanitize]]}}
                      />
                    </FormControl>
                    <FormMessage/>
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
