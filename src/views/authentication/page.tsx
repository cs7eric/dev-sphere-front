import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import {UserAuthForm} from "@/views/authentication/components/user-auth-form"
import React from "react";
import {Link} from "react-router-dom";
import {Image} from "@unpic/react";
import Lanyard from "@/components/reactbits/Lanyard.tsx"; // 基于 unpic 的通用图片组件

export default function AuthenticationPage() {
  return (
    <>
      <div className="m-20 mx-auto border max-w-[60vw] rounded-3xl flex items-center">
        <div className="md:hidden rounded-2xl">
          <Image
            src="https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250308001330271.png"
            width={1000}
            height={843}
            alt="Authentication"
            className="block dark:hidden border rounded-2xl"
            layout="constrained" // 替代 Next.js 的 layout 行为
            background="auto" // 自动处理占位背景
            breakpoints={[640, 768, 1024, 1280]} // 响应式断点
          />
          <Image
            src="https://cs7eric-image.oss-cn-hangzhou.aliyuncs.com/images/image-20250308001330271.png"
            width={1000}
            height={843}
            alt="Authentication"
            className="block dark:hidden"
            layout="constrained" // 替代 Next.js 的 layout 行为
            background="auto" // 自动处理占位背景
            breakpoints={[640, 768, 1024, 1280]} // 响应式断点
          />

        </div>
        <div
          className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Link
            to="/authentication"
            className={cn(
              buttonVariants({variant: "ghost"}),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Login
          </Link>

          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-zinc-900"/>
            <div className="relative z-20 flex items-center text-lg font-medium">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
              </svg>
              Devsphere
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This library has saved me countless hours of work and
                  helped me deliver stunning designs to my clients faster than
                  ever before.&rdquo;
                </p>
                <footer className="text-sm">Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <UserAuthForm/>
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  to={"/terms"}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to={"/privacy"}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
