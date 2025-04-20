import React from 'react';
import CustomSpinner from './custom-spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 自定义Spinner组件示例
 * 展示不同配置下的CustomSpinner组件效果
 */
export default function SpinnerExample() {
  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">自定义Spinner组件示例</h1>
      <p className="text-gray-500">以下展示了不同配置的自定义Spinner组件</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* 示例1：默认配置 */}
        <Card>
          <CardHeader>
            <CardTitle>默认配置</CardTitle>
            <CardDescription>使用默认宽高和行数</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CustomSpinner />
          </CardContent>
        </Card>

        {/* 示例2：自定义宽高 */}
        <Card>
          <CardHeader>
            <CardTitle>自定义宽高</CardTitle>
            <CardDescription>宽度100px，高度30px</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CustomSpinner width="100px" height="30px" />
          </CardContent>
        </Card>

        {/* 示例3：多行Spinner */}
        <Card>
          <CardHeader>
            <CardTitle>多行Spinner</CardTitle>
            <CardDescription>3行Spinner，默认宽高</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CustomSpinner rows={3} />
          </CardContent>
        </Card>

        {/* 示例4：完全自定义 */}
        <Card>
          <CardHeader>
            <CardTitle>完全自定义</CardTitle>
            <CardDescription>宽度100px，高度30px，3行</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CustomSpinner width="100px" height="30px" rows={3} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}