"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {toast} from "@/registry/hooks/use-toast"
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

const FormSchema = z.object({
  pin: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('验证码值:', data.pin); // 添加控制台打印验证码值
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
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
                  {...field}  // 关键修复：正确绑定表单字段
                >
                  <InputOTPGroup className="mt-4 gap-2">
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="h-12 w-12 text-lg"
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
