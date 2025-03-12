// app/providers.tsx

import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";

export default function Providers({children}) {
  return (
    <HeroUIProvider>
      <ToastProvider
        toastOffset={70}
        placement={'top-right'}
        toastProps={{
          radius: "full",
          color: "primary",
          content: {
            size: 'sm'
          },
          variant: "flat",
          timeout: 1000,
          hideIcon: true,
          classNames: {
            closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
        }}
        className={'w-[100px]'}
      />
      {children}
    </HeroUIProvider>
  )
}