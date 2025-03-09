import { RoadmapTree } from './components/RoadmapTree';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function RoadmapPage () {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">学习路线图</h1>
          <p className="text-muted-foreground mt-2">跟踪你的学习进度，点亮技能节点</p>
        </div>
        <Separator />
        
        <Card>
          <CardHeader>
            <CardTitle>前端开发路线图</CardTitle>
            <CardDescription>从基础到高级的前端开发学习路径</CardDescription>
          </CardHeader>
          <CardContent>
            <RoadmapTree className="mt-4" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}