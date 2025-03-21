import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"

import {cn} from "@/lib/utils.ts"
import {toast} from "@/registry/hooks/use-toast.ts"
import {Button} from "@/components/ui/button.tsx"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx"
import {Input} from "@/components/ui/input.tsx"

import {Textarea} from "@/components/ui/textarea.tsx"
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {useDispatch} from "react-redux";
import {UserInfo} from "@/store/features/user/userInfoSlice.ts";
import {getUserInfoUsingPost, updateUsingPost2} from "@/apis/auth";

const userInfoSchema = z.object({
  nickName: z
    .string()
    .min(2, {
      message: "nickName must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  introduce: z.string().max(160).min(4),
  phone: z
    .string()
    .min(11, {
      required_error: "phone must not be shorter than 11 characters."
    }),
  sex: z
    .any(),
})

type ProfileFormValues = z.infer<typeof userInfoSchema>

export function ProfileForm() {
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 从localStorage获取用户信息
  const userInfoStorageString = localStorage.getItem('userInfo')
  const userInfoStorage = userInfoStorageString ? JSON.parse(userInfoStorageString) : {}
  const {loginId, tokenValue} = userInfoStorage
  const getUserInfo = async () => {

    const body = {
      userName: loginId
    }
    await getUserInfoUsingPost({body})
      .then((res) => {
        if (res.success) {
          setUserInfo(res.data)
        }
      })
    console.log(loginId, tokenValue)

  }

  useEffect(() => {
    getUserInfo()
  }, [loginId]);


  // 设置表单默认值
  const [defaultValues, setDefaultValues] = useState<Partial<ProfileFormValues>>({
    userName: loginId,
    nickName: '',
    phone: '',
    email: '',
    introduce: '',
    gender: ''
  })

  // 创建表单实例
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues,
    mode: "onChange",
  })

  // 当用户信息更新时，重置表单值
  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      setDefaultValues({
        nickName: userInfo.nickName || '',
        phone: userInfo.phone || '',
        email: userInfo.email || '',
        introduce: userInfo.introduce || '',
        sex: userInfo.sex || ''
      })

      form.reset({
        nickName: userInfo.nickName || '',
        phone: userInfo.phone || '',
        email: userInfo.email || '',
        introduce: userInfo.introduce || '',
        sex: userInfo.sex || ''
      })
    }
  }, [userInfo, form])


  // 处理表单提交
  async function onSubmit(data: ProfileFormValues) {
    try {
      // 这里应该调用更新用户信息的API
      const response = await updateUsingPost2({body: {...data, userName:loginId} })


      if (response.success) {
        // 更新本地用户信息
        setUserInfo(prev => ({...prev, ...data}))

        // 显示成功提示
        toast({
          title: "用户信息更新成功",
          description: "您的个人资料已成功更新"
        })
      } else {
        // 显示错误提示
        toast({
          title: "更新失败",
          description: response.message || "更新用户信息时出错，请稍后重试",
          variant: "destructive"
        })
      }
    } catch
      (error) {
      console.error('更新用户信息出错:', error)
      toast({
        title: "更新失败",
        description: "更新用户信息时出错，请稍后重试",
        variant: "destructive"
      })
    }


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nickName"
          render={({field}) => (
            <FormItem>
              <FormLabel>nickname</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField control={form.control}
                   name="gender"
                   render={({field}) => (
                     <FormItem className="space-y-3">
                       <FormLabel>your gender</FormLabel>
                       <FormControl>
                         <RadioGroup
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                           className="flex flex-col space-y-1"
                         >
                           <FormItem className="flex items-center space-x-3 space-y-0">
                             <FormControl>
                               <RadioGroupItem value="1"/>
                             </FormControl>
                             <FormLabel className="font-normal">
                               male
                             </FormLabel>
                           </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                             <FormControl>
                               <RadioGroupItem value="0"/>
                             </FormControl>
                             <FormLabel className="font-normal">
                               female
                             </FormLabel>
                           </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                             <FormControl>
                               <RadioGroupItem value="2"/>
                             </FormControl>
                             <FormLabel className="font-normal">secret</FormLabel>
                           </FormItem>
                         </RadioGroup>
                       </FormControl>
                       <FormMessage/>
                     </FormItem>
                   )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({field}) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input placeholder="+86 1xx xxxx xxxx" {...field} />
              </FormControl>
              <FormDescription>
                This is your public phone. It should be cn
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input placeholder="xxxx@youremail.com" {...field}></Input>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link to={"/settings"}>email settings</Link>.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({field}) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
