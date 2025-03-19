import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import UserList from "@/components/user/user-list.tsx";
import CircleList from "@/views/circle/components/circle-list.tsx";

export default function SettingsSocialContactPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="followed" className="w-full">
        <TabsList className="grid w-[300px] grid-cols-3">
          <TabsTrigger value="followed">followed</TabsTrigger>
          <TabsTrigger value="fans">fans</TabsTrigger>
          <TabsTrigger value="circle">circle</TabsTrigger>

        </TabsList>
        <TabsContent value="followed" className="min-w-[1200px]">
          <ScrollArea className="h-[600px]">
            <UserList ></UserList>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="fans" className="lg:min-w-[1300px] sm:min-w-[500px]">
          <ScrollArea className="h-[600px]">
            <UserList></UserList>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="circle" className="min-w-[1200px]">
          <ScrollArea className="h-[600px]">
            <CircleList></CircleList>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
