
import { Separator } from "@/components/ui/separator.tsx"
import { SidebarNav } from "@/views/forms/components/sidebar-nav.tsx"
import {ThemeProvider} from "@/components/theme-provider.tsx";


const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Data",
    href: "/settings/data",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "SocialContact",
    href: "/settings/social-contact",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>

      <div className="md:hidden">
        <div className="w-1280px h-791px"></div>
        <div className="w-1280px h-791px"></div>


      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 text-2xl">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl ml-30">{children}</div>
        </div>
      </div>
    </>
  )
}
