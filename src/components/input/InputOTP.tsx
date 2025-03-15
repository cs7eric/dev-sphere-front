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
import {doLoginUsingGet1} from "@/apis/auth";


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


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('验证码值:', data.pin); // 添加控制台打印验证码值
    toast({
      description: "发送成功",
      title: '验证码'
    })
    const params = {
      validCode: String
    }
    params.validCode = data.pin
    const res = await doLoginUsingGet1({params})
    const { tokenValue, loginId } = res.data.data;
    console.log(res)
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
