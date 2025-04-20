import React, { useState, useEffect, ReactNode } from 'react';
import { Button } from "@/components/ui/button.tsx";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";

interface RetryWrapperProps<T> {
  fetchData: () => Promise<T>;
  children: (data: T) => ReactNode;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  errorTitle?: string;
  errorDescription?: string;
  retryButtonText?: string;
  isEmpty?: (data: T) => boolean;
}

/**
 * RetryWrapper - A component that handles API request retries
 * 
 * @param fetchData - Function that returns a promise with the data
 * @param children - Render prop that receives the fetched data
 * @param loadingComponent - Optional component to show while loading
 * @param emptyComponent - Optional component to show when data is empty
 * @param errorTitle - Optional custom error title
 * @param errorDescription - Optional custom error description
 * @param retryButtonText - Optional custom retry button text
 * @param isEmpty - Optional function to determine if data is empty
 */
export function RetryWrapper<T>({
  fetchData,
  children,
  loadingComponent = <div className="flex justify-center p-4">Loading...</div>,
  emptyComponent = <div className="flex justify-center p-4">暂无数据</div>,
  errorTitle = "请求失败",
  errorDescription = "获取数据时发生错误，请重试",
  retryButtonText = "重试",
  isEmpty = (data: T) => {
    if (data === null || data === undefined) return true;
    if (Array.isArray(data) && data.length === 0) return true;
    if (typeof data === 'object' && Object.keys(data).length === 0) return true;
    return false;
  }
}: RetryWrapperProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const handleFetchData = async () => {
    setLoading(true);
    setError(false);
    
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <span>{errorDescription}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleFetchData}
            className="w-fit"
          >
            {retryButtonText}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // 检查数据是否为空
  if (data && isEmpty(data)) {
    return <>{emptyComponent}</>;
  }

  return <>{data ? children(data) : null}</>;
}

/**
 * useRetry - A hook that provides retry functionality for data fetching
 * 
 * @param fetchFn - The function that fetches data
 * @returns An object containing data, loading state, error state, and a retry function
 */
export function useRetry<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    
    try {
      const result = await fetchFn();
      setData(result);
      return result;
    } catch (err) {
      console.error('Error in useRetry:', err);
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().catch(() => {});
  }, []);

  return { data, loading, error, retry: fetchData };
}