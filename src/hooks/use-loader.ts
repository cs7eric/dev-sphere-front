import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '@/store/features/loader/loaderSlice';

/**
 * 自定义Hook，用于控制全局加载状态
 * @returns 包含显示和隐藏加载器的方法的对象
 */
export const useLoader = () => {
  const dispatch = useDispatch();

  // 显示全局加载器
  const showGlobalLoader = () => {
    console.log("show")
    dispatch(showLoader());
  };

  // 隐藏全局加载器
  const hideGlobalLoader = () => {
    console.log("hide")

    dispatch(hideLoader());
  };

  return {
    showGlobalLoader,
    hideGlobalLoader,
  };
};