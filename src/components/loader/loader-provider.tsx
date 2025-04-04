import React from 'react';
import GlobalLoader from './global-loader';

/**
 * LoaderProvider组件
 * 提供全局加载状态的UI展示
 * 这个组件应该被放置在应用的根组件中，以确保加载状态可以在整个应用中显示
 */
export const LoaderProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <GlobalLoader />
      {children}
    </>
  );
};