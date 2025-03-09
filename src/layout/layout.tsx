import {Image} from "@unpic/react"

import {MainNav} from "@/views/home/components/main-nav.tsx"
import {Search} from "@/views/home/components/search.tsx"
import {UserNav} from "@/views/home/components/user-nav.tsx"
import TeamSwitcher from "@/views/home/components/team-switcher.tsx";


export default function MainLayout({children}: { children: React.ReactNode }) {
  return (
    <>

      <div className="md:hidden ">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b fixed top-0 left-0 right-0 z-50 bg-background">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher/>
            <MainNav className="mx-6"/>
            <div className="ml-auto flex items-center space-x-4">
              <Search/>
              <UserNav/>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 mt-16">
          {children}
        </div>
      </div>
    </>
  )
}
