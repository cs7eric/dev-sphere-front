"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {useToast} from "@/registry/hooks/use-toast"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {doLoginUsingGet1, getUserInfoUsingGet, getUserInfoUsingPost} from "@/apis/auth";
import store from "@/store";
import {saveUserInfo, selectUserInfo} from "@/store/features/user/userInfoSlice.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


const FormSchema = z.object({
  pin: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function InputOTPForm() {
  const {toast} = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const fetchUserInfo = async (loginId) => {

    const body = {
      userName: loginId
    }

    getUserInfoUsingPost({body})
    .then(res => {
      if (res?.success && res?.data) {
        // 存储到localStorage
        // localStorage.setItem('userInfo', JSON.stringify(res.data))
        // 更新Redux store
        console.log(res.data)
        dispatch(saveUserInfo(res.data));

      }
    })
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const params = {
        validCode: String
      }
      params.validCode = data.pin
      const res = await doLoginUsingGet1({params})
      if (res.success == false) {
        toast({
          variant: "danger",
          title: "登录失败",
          description: res.data
        })
        return
      }
      localStorage.setItem('userInfo', JSON.stringify(res.data))

      await fetchUserInfo(res.data.loginId)

      toast({
        variant: "success",
        title: "登录成功",
        description: "欢迎回来"
      })
      navigate('/')
    } catch (error) {
      console.log("登录失败" + error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({field}) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field} // 关键修复：正确绑定表单字段
                >
                  <InputOTPGroup className="mt-4 gap-2">
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="h-12 w-12 text-md border"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">Submit</Button>
      </form>
    </Form>
  )
}
