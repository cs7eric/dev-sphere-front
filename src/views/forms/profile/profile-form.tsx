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
import React from "react";
import {Link} from "react-router-dom";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

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
  bio: z.string().max(160).min(4),
  phone: z
    .string()
    .min(11, {
      required_error: "phone must not be shorter than 11 characters."
    }),
  gender: z
    .any()
})

type ProfileFormValues = z.infer<typeof userInfoSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer."
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues,
    mode: "onChange",
  })


  function onSubmit(data: ProfileFormValues) {
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
                               <RadioGroupItem value="secret"/>
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
