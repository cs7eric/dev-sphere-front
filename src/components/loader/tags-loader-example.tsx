import React from 'react';
import TagsLoader from './tags-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 标签加载器组件示例
 * 展示不同配置下的TagsLoader组件效果
 */
export default function TagsLoaderExample() {
  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">标签加载器组件示例</h1>
      <p className="text-gray-500">以下展示了不同配置的标签加载器组件</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* 示例1：默认配置 */}
        <Card>
          <CardHeader>
            <CardTitle>默认配置</CardTitle>
            <CardDescription>使用默认宽高（80px x 32px）</CardDescription>
          </CardHeader>
          <CardContent>
            <TagsLoader />
          </CardContent>
        </Card>

        {/* 示例2：自定义宽高 */}
        <Card>
          <CardHeader>
            <CardTitle>自定义宽高</CardTitle>
            <CardDescription>宽度100px，高度24px</CardDescription>
          </CardHeader>
          <CardContent className={'max-w-md'}>
            <TagsLoader tagWidth="70px" tagHeight="24px" />
          </CardContent>
        </Card>

        {/* 示例3：更小的标签 */}
        <Card>
          <CardHeader>
            <CardTitle>小型标签</CardTitle>
            <CardDescription>宽度60px，高度24px</CardDescription>
          </CardHeader>
          <CardContent>
            <TagsLoader tagWidth="60px" tagHeight="24px" />
          </CardContent>
        </Card>

        {/* 示例4：自定义间距 */}
        <Card>
          <CardHeader>
            <CardTitle>自定义间距</CardTitle>
            <CardDescription>使用更大的间距</CardDescription>
          </CardHeader>
          <CardContent>
            <TagsLoader className="gap-4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}