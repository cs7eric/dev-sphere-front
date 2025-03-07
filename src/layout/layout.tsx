import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-siderbar.tsx"
import {ThemeProvider} from "@/components/theme-provider.tsx";

export default function Layout({children}: { children: React.ReactNode }) {
  return (


    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider defaultOpen={false} >
        <AppSidebar/>

        <main>

          <SidebarTrigger/>
          <div className="main-container items-start overflow-hidden rounded-lg min-h-[93vh] min-w-[93vw] flex justify-center items-center p-5 border ml-6 mt-3">

            {children}

          </div>

        </main>
      </SidebarProvider>
    </ThemeProvider>


  )
}
