import React from 'react';
import { RetryWrapper, useRetry } from './retry-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// 模拟一个可能会失败的API请求
const fetchUserData = async () => {
  // 模拟随机失败的API请求
  const shouldFail = Math.random() > 0.5;
  
  if (shouldFail) {
    throw new Error('API请求失败');
  }
  
  return {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com'
  };
};

/**
 * 示例1：使用RetryWrapper组件
 * 这是一个包装组件的方式，适合需要在UI中展示加载状态和错误状态的场景
 */
export function RetryWrapperExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>使用RetryWrapper组件</CardTitle>
        <CardDescription>包装组件方式实现重试功能</CardDescription>
      </CardHeader>
      <CardContent>
        <RetryWrapper
          fetchData={fetchUserData}
          errorTitle="获取用户信息失败"
          errorDescription="无法获取用户数据，请检查网络连接后重试"
          retryButtonText="重新获取"
        >
          {(userData) => (
            <div className="space-y-2">
              <p><strong>用户ID:</strong> {userData.id}</p>
              <p><strong>姓名:</strong> {userData.name}</p>
              <p><strong>邮箱:</strong> {userData.email}</p>
            </div>
          )}
        </RetryWrapper>
      </CardContent>
    </Card>
  );
}

/**
 * 示例2：使用useRetry Hook
 * 这是一个自定义Hook的方式，适合需要更灵活控制UI和状态的场景
 */
export function UseRetryHookExample() {
  const { data: userData, loading, error, retry } = useRetry(fetchUserData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>使用useRetry Hook</CardTitle>
        <CardDescription>Hook方式实现重试功能</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <div className="flex justify-center p-4">加载中...</div>}
        
        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertDescription className="flex flex-col gap-2">
              <span>获取用户数据失败，请重试</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={retry}
                className="w-fit"
              >
                重新获取
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {userData && (
          <div className="space-y-2">
            <p><strong>用户ID:</strong> {userData.id}</p>
            <p><strong>姓名:</strong> {userData.name}</p>
            <p><strong>邮箱:</strong> {userData.email}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * 组合示例：展示两种实现方式
 */
export default function RetryExamples() {
  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold">数据请求重试示例</h1>
      <p className="text-gray-500">以下展示了两种实现数据请求重试功能的方式</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <RetryWrapperExample />
        <UseRetryHookExample />
      </div>
    </div>
  );
}