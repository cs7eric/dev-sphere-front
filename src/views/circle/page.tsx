import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiSearch2Line} from "react-icons/ri";
import CircleList from "@/views/circle/components/circle-list.tsx";
import {IoAddCircle} from "react-icons/io5";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import ComboboxArea from "@/components/input/combobox-area.tsx";
import {useEffect, useState} from "react";
import {queryPrimaryCategoryUsingPost} from "@/apis/subject";
import {toast} from "@/registry/hooks/use-toast.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ImageUpload} from "@/components/upload/image-upload.tsx";
import {useLoader} from "@/hooks/use-loader.ts";
import ArticleList from "@/components/article/article-list.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {FaRegGrinStars} from "react-icons/fa";
import {MdSettingsSuggest} from "react-icons/md";
import {MomentDialog} from "@/views/article/components/dialog/moment-dialog.tsx";
import {ArticleDialog} from "@/views/article/components/dialog/article-dialog.tsx";
import {addUsingPost1, getArticleByCircleUsingPost, getSubscribeListByUserIdUsingPost} from "@/apis/circle";
import {getStoredUserInfo} from '@/utils/user.ts'
export default function CirclePage() {

  const [circleCategoryList, setCircleCategoryList] = useState()<[]>
  const {showGlobalLoader, hideGlobalLoader} = useLoader()
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

  const FormSchema = z.object({
    circleName: z.string().min(2, {
      message: "circleName must be at least 2 characters.",
    }),
    categoryId: z.number({
      message: "not null"
    }),
    intro: z.string().optional(), // 添加介绍字段
    imageUrl: z.string().url({ // 添加图片URL字段
      message: "Please upload a valid image"
    })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      circleName: "",
      categoryId: ""
    },
  })

  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {


    const userInfo = getStoredUserInfo()
    setIsOpen(true)

    const body = {
      userName: userInfo.loginId,
      circleName: data.circleName,
      categoryId: data.categoryId,
      circleIntro: data.intro,
      icon: data.imageUrl
    }
    showGlobalLoader()

    const res = await addUsingPost1({body})
    if (res.success) {
      toast({
        title: "Success",
        description: "创建成功"
      })
      setIsOpen(false);
      form.reset();
      hideGlobalLoader();
    } else {
      toast({
        title: "Error",
        description: "失败，请重新尝试"
      })
      hideGlobalLoader();
    }


  }

  const [articleList, setArticleList] = useState()<[]>

  const fetchMomentList = async () => {

    // const res = await
  }

  useEffect(() => {
    fetchMomentList()
  }, [Tabs]);

  const [circleListData,setCircleListData] = useState([])
  const fetchCircleListData = async () => {
    const userInfo = getStoredUserInfo()

    const body = {
      userName: userInfo.loginId
    }
    const res = await getSubscribeListByUserIdUsingPost({body})
    if (res.success) {
      setCircleListData(res.data)
    }
  }

  useEffect(() => {
    fetchCircleListData()
  }, []);

  const [articleListData, setArticleListData] = useState([])
  const fetchArticleListData = async () => {
    const body = {
      circleId: 16
    }
    const res = await getArticleByCircleUsingPost({body})
    if (res.success) {
      setArticleListData(res.data)
    }
  }

  useEffect(() => {
    fetchArticleListData()
  }, []);

  return (
    <>
      <div className="group-container flex flex-col justify-center">
        <div className="top-section flex justify-center">
          <div className="search-area mt-8 gap-4 flex">
            <Input className="w-180 h-12" placeholder="search for subjects、users or article"/>
            <Button
              className="h-12 px-1">
              <RiSearch2Line className="transform scale-120"/>
              <span className="font-bold">Search</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger>
                <Button
                  onClick={()=> {setIsOpen(true)}}
                  className="h-12 px-1" variant='outline'
                >
                  <IoAddCircle className="transform scale-120"/>
                  <span className="font-bold">create</span>
                </Button>
              </DialogTrigger>
              <DialogContent
                className='md:max-w-xl'
              >
                <DialogHeader>
                  <DialogTitle>Add circle</DialogTitle>
                </DialogHeader>
                <div className="add-circle-content">
                  <Form
                    {...form}
                  >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                      <div className='flex flex-col gap-4'>
                        <div className='flex gap-9'>
                          <FormField
                            className='md:w-auto'
                            control={form.control}
                            name="circleName"
                            render={({field}) => (
                              <div className='flex items-start gap-4 '>
                                <FormItem>
                                  <FormLabel>CircleName</FormLabel>
                                  <FormControl>
                                    <Input placeholder="circle-name" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    This is your public display circle name.
                                  </FormDescription>
                                  <FormMessage/>
                                </FormItem>
                              </div>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="categoryId"
                            render={({field}) => (
                              <div className='flex items-start '>
                                <FormItem>
                                  <FormLabel>category</FormLabel>
                                  <FormControl>
                                    <ComboboxArea
                                      list={circleCategoryList}
                                      {...field}
                                    ></ComboboxArea>
                                  </FormControl>
                                  <FormMessage/>
                                </FormItem>
                              </div>
                            )}
                          />
                        </div>
                        <div className="circle-intro flex w-full">
                          <FormField
                            control={form.control}
                            className='md:w-full'
                            name="intro"
                            render={({field}) => (
                              <div className='flex items-start gap-4'>
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      className="resize-none flex w-lg"
                                      placeholder="say something about the circle"/>
                                  </FormControl>
                                </FormItem>
                              </div>
                            )}
                          />
                        </div>
                        <div className="avatar">
                          <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({field}) => (
                              <FormItem>
                                <FormControl>
                                  <ImageUpload
                                    onUploadComplete={(url) => {
                                      field.onChange(url); // 将URL存入表单
                                    }}
                                  />
                                </FormControl>
                                <FormDescription>
                                  upload image for your circle avatar
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>

                      </div>
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>

                </div>
              </DialogContent>
            </Dialog>
            <MomentDialog></MomentDialog>
            <ArticleDialog></ArticleDialog>

          </div>
        </div>
        <div className="main-section space-y-10 mt-30 mx-80">
          <div className="circle-list">
            <h3 className={'text-2xl font-bold'}>Back End </h3>
            <CircleList
              className={'mt-3'}
              circleList={circleListData}
            ></CircleList>

            <Button
              variant={'secondary'}
              className={'mt-6'}
            >Expand</Button>

            <div className="w-full border-b mt-3"></div>

          </div>

          <div className="moment-area">
            <Tabs defaultValue="subscribe" className="w-full">
              <TabsList>
                <TabsTrigger value="subscribe"><FaRegGrinStars/>Subscribe</TabsTrigger>

                <TabsTrigger value="recommend" disabled={true}><MdSettingsSuggest/>recommend</TabsTrigger>
              </TabsList>
              <TabsContent value="recommend"></TabsContent>
              <TabsContent value="subscribe">
                <ArticleList articleList={articleListData}></ArticleList>
              </TabsContent>
            </Tabs>

          </div>
        </div>
      </div>
    </>
  )
}