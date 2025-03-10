import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  loadingClassName?: string;
  threshold?: number; // 可见性阈值，默认为0.1
  rootMargin?: string; // 根元素的边距，默认为"0px"
}

/**
 * 懒加载图片组件
 * 使用IntersectionObserver API监测元素可见性，只在图片进入视口时才加载
 */
export function LazyImage({
  src,
  alt,
  placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=',
  className,
  loadingClassName,
  threshold = 0.1,
  rootMargin = '0px',
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // 使用IntersectionObserver监测元素可见性
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          // 一旦图片进入视口，取消观察
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [threshold, rootMargin]);

  // 处理图片加载完成事件
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative overflow-hidden">
      <img
        ref={imgRef}
        src={isInView ? src : placeholderSrc}
        alt={alt}
        className={cn(
          className,
          !isLoaded && isInView && loadingClassName,
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={handleImageLoaded}
        {...props}
      />
      {isInView && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}