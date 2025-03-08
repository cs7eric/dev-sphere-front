"use client"

import React from 'react'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Lanyard from "@/components/reactbits/Lanyard.tsx";
import {Canvas} from '@react-three/fiber'


// 定义表单验证模式
const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少需要2个字符",
  }),
  password: z.string().min(6, {
    message: "密码至少需要6个字符",
  }),
})

const LoginView: React.FC = () => {
  // 初始化表单
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // 提交处理
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // 处理登录逻辑
      console.log('登录信息:', values)
    } catch (error) {
      console.error('登录失败:', error)
    }
  }
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <div className="fixed inset-0 z-[52] pointer-events-none">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} className="pointer-events-none" />
        </div>
        <div className="login-container relative z-[52] flex justify-center mt-[20vh]">
          <Tabs defaultValue="account" className="w-[380px] h-[600px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account" className="font-semibold">QR CODE</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte"/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte"/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">

                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password"/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password"/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="">Click!</Button>
                  <Button className="ml-[20px]">Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
export default LoginView
