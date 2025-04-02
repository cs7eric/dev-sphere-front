import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from './loader';
import { selectLoading } from '@/store/features/loader/loaderSlice';

const GlobalLoader = () => {
  // 从Redux状态中获取loading状态
  const isLoading = useSelector(selectLoading);

  // 如果不在加载状态，则不渲染任何内容
  if (!isLoading) return null;

  return (
    <LoaderOverlay>
      <Loader />
    </LoaderOverlay>
  );
};

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999; // 确保Loader显示在所有内容之上
  pointer-events: none;
  cursor: not-allowed;

  & > * {
    pointer-events: none;
  }
`;

export default GlobalLoader;