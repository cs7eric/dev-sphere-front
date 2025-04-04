import React from 'react';
import { Button } from '@/components/ui/button';
import { useLoader } from '@/hooks/use-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from "@/components/loader/loader.tsx";

/**
 * Loader示例组件
 * 展示如何使用useLoader hook控制全局加载状态
 */
const LoaderExample = () => {
  // 使用自定义Hook获取加载器控制方法
  const { showGlobalLoader, hideGlobalLoader } = useLoader();

  // 模拟异步操作
  const simulateAsyncOperation = () => {
    showGlobalLoader(); // 显示加载器
    
    // 3秒后自动隐藏加载器
    setTimeout(() => {
      hideGlobalLoader();
    }, 3000);
  };

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">全局加载器示例</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>基本用法</CardTitle>
            <CardDescription>
              点击按钮显示全局加载器，3秒后自动隐藏
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={simulateAsyncOperation}>
              显示加载器 (3秒)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>手动控制</CardTitle>
            <CardDescription>
              分别使用按钮手动控制加载器的显示和隐藏
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Loader/>
            <Button onClick={showGlobalLoader} variant="default">
              显示加载器
            </Button>
            <Button onClick={hideGlobalLoader} variant="outline">
              隐藏加载器
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实际应用场景</CardTitle>
            <CardDescription>
              在数据加载过程中显示加载状态
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                showGlobalLoader();
                // 模拟API请求
                setTimeout(() => {
                  hideGlobalLoader();
                  // 显示成功消息
                  alert('数据加载成功！');
                }, 2000);
              }}
            >
              加载数据
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>表单提交示例</CardTitle>
            <CardDescription>
              在表单提交过程中显示加载状态
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                showGlobalLoader();
                // 模拟表单提交
                setTimeout(() => {
                  hideGlobalLoader();
                  // 显示成功消息
                  alert('表单提交成功！');
                }, 1500);
              }}
            >
              提交表单
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">使用说明</h2>
        <p className="mb-2">1. 导入useLoader hook：<code>import {'{ useLoader }'} from '@/hooks/use-loader';</code></p>
        <p className="mb-2">2. 在组件中使用hook：<code>const {'{ showGlobalLoader, hideGlobalLoader }'} = useLoader();</code></p>
        <p className="mb-2">3. 调用方法显示/隐藏加载器：<code>showGlobalLoader()</code> 和 <code>hideGlobalLoader()</code></p>
        <p>4. 确保在应用根组件中已引入GlobalLoader组件</p>
      </div>
    </div>
  );
};

export default LoaderExample;