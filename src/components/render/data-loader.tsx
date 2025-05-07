import React, { ReactNode } from 'react';

interface DataLoaderProps {
  data: any[];
  loading: boolean;
  children: (data: any[]) => ReactNode;
  emptyComponent: ReactNode;
  loaderComponent: ReactNode; // 允许传入自定义的加载组件
}

const DataLoader: React.FC<DataLoaderProps> = ({ data, loading, children, emptyComponent, loaderComponent }) => {
  if (loading) {
    return <>{loaderComponent}</>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <>{emptyComponent}</>;
  }

  return <>{children(data)}</>;
};

export default DataLoader;