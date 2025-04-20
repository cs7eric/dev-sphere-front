import React from 'react';
import ContentLoader from './content-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 内容加载器示例组件
 * 展示不同类型的ContentLoader组件效果
 */
export default function ContentLoaderExample() {
  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">内容加载器示例</h1>
      <p className="text-gray-500">以下展示了不同类型的内容加载器组件</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* 用户类型加载器 */}
        <Card>
          <CardHeader>
            <CardTitle>用户类型加载器</CardTitle>
            <CardDescription>左侧头像，右侧两行文本</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentLoader type="user" rows={2} />
          </CardContent>
        </Card>

        {/* 卡片类型加载器 */}
        <Card>
          <CardHeader>
            <CardTitle>卡片类型加载器</CardTitle>
            <CardDescription>卡片布局的加载效果</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentLoader type="card" rows={1} />
          </CardContent>
        </Card>

        {/* 文章类型加载器 */}
        <Card>
          <CardHeader>
            <CardTitle>文章类型加载器</CardTitle>
            <CardDescription>文章内容的加载效果</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentLoader type="article" rows={1} />
          </CardContent>
        </Card>

        {/* 自定义宽高 */}
        <Card>
          <CardHeader>
            <CardTitle>自定义宽高</CardTitle>
            <CardDescription>用户类型，自定义宽高</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentLoader 
              type="user" 
              width="100%" 
              height="80px" 
              rows={1} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}