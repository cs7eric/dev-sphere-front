"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/ui/icons"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Image} from '@unpic/react'


// 懒加载OTP表单组件
const InputOTPForm = React.lazy(() => import("@/components/input/InputOTP.tsx").then(module => ({default: module.InputOTPForm})));

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UserAuthForm({className, ...props}: UserAuthFormProps) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showInput, setShowInput] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)


    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"/>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {showInput ? (
        <React.Suspense fallback={<div className="flex items-center justify-center p-3"><Icons.spinner
          className="h-6 w-6 animate-spin"/></div>}>
          <div className='flex justify-center'>
            <Image
              src={'https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250314211249700.png'}
              width={'100px'}
              className='rounded-sm'
            ></Image>
          </div>

          <InputOTPForm></InputOTPForm>
        </React.Suspense>
      ) : ''}

      {showInput ? '' : <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          setShowInput(true)
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
        ) : (
          <Icons.wechat className="mr-2 h-4 w-4"/>
        )}{" "}
        WeChat
      </Button>
      }

    </div>
  )
}
