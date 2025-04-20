import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";

type LoaderType = 'user' | 'card' | 'article';

interface ContentLoaderProps {
  type: LoaderType;
  width?: string;
  height?: string;
  rows?: number;
  className?: string;
  animated?: boolean;
}

/**
 * 内容加载组件
 * 提供不同类型的内容加载样式，包括用户、卡片和文章类型
 * 
 * @param type - 加载器类型：'user'(用户)、'card'(卡片)、'article'(文章)
 * @param width - 加载器的宽度，默认根据类型不同有不同默认值
 * @param height - 加载器的高度，默认根据类型不同有不同默认值
 * @param rows - 加载器的行数，默认为1
 * @param className - 额外的CSS类名
 * @param animated - 是否启用动画效果，默认为true
 */
const ContentLoader: React.FC<ContentLoaderProps> = ({
  type,
  width,
  height,
  rows = 1,
  className,
  animated = true,
}) => {
  // 根据类型设置默认宽高
  const getDefaultDimensions = () => {
    switch (type) {
      case 'user':
        return { width: width || '280px', height: height || '60px' };
      case 'card':
        return { width: width || '240px', height: height || '120px' };
      case 'article':
        return { width: width || '100%', height: height || '80px' };
      default:
        return { width: width || '240px', height: height || '60px' };
    }
  };

  const { width: defaultWidth, height: defaultHeight } = getDefaultDimensions();
  const items = Array.from({ length: rows }, (_, index) => index);

  // 用户类型加载器 - 左侧头像，右侧两行文本
  const renderUserLoader = (index: number) => (
    <div 
      key={index}
      className="flex items-center gap-3"
      style={{ width: defaultWidth, height: defaultHeight }}
    >
      {/* 左侧圆形头像 */}
      <Skeleton 
        className={cn("rounded-full", animated && "animate-pulse")} 
        style={{ width: '40px', height: '40px' }} 
      />
      {/* 右侧两行文本 */}
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton 
          className={cn("h-4 w-3/4", animated && "animate-pulse")} 
        />
        <Skeleton 
          className={cn("h-3 w-1/2", animated && "animate-pulse")} 
        />
      </div>
    </div>
  );

  // 卡片类型加载器
  const renderCardLoader = (index: number) => (
    <div 
      key={index}
      className="flex flex-col gap-3 p-3 border rounded-md"
      style={{ width: defaultWidth, height: defaultHeight }}
    >
      {/* 卡片头部 */}
      <div className="flex items-center justify-between w-full">
        <Skeleton 
          className={cn("h-6 w-1/2", animated && "animate-pulse")} 
        />
        <Skeleton 
          className={cn("h-6 w-8 rounded-full", animated && "animate-pulse")} 
        />
      </div>
      {/* 卡片内容 */}
      <Skeleton 
        className={cn("h-4 w-full", animated && "animate-pulse")} 
      />
      <Skeleton 
        className={cn("h-4 w-3/4", animated && "animate-pulse")} 
      />
      {/* 卡片底部 */}
      <div className="flex items-center justify-between mt-auto">
        <Skeleton 
          className={cn("h-4 w-1/4", animated && "animate-pulse")} 
        />
        <Skeleton 
          className={cn("h-4 w-1/4", animated && "animate-pulse")} 
        />
      </div>
    </div>
  );

  // 文章类型加载器
  const renderArticleLoader = (index: number) => (
    <div 
      key={index}
      className="flex flex-col gap-3"
      style={{ width: defaultWidth, height: defaultHeight }}
    >
      {/* 文章标题 */}
      <Skeleton 
        className={cn("h-6 w-3/4", animated && "animate-pulse")} 
      />
      {/* 文章元信息 */}
      <div className="flex items-center gap-2">
        <Skeleton 
          className={cn("h-4 w-20 rounded-full", animated && "animate-pulse")} 
        />
        <Skeleton 
          className={cn("h-4 w-20 rounded-full", animated && "animate-pulse")} 
        />
      </div>
      {/* 文章内容预览 */}
      <Skeleton 
        className={cn("h-4 w-full", animated && "animate-pulse")} 
      />
      <Skeleton 
        className={cn("h-4 w-full", animated && "animate-pulse")} 
      />
      <Skeleton 
        className={cn("h-4 w-2/3", animated && "animate-pulse")} 
      />
    </div>
  );

  // 根据类型渲染不同的加载器
  const renderLoader = (index: number) => {
    switch (type) {
      case 'user':
        return renderUserLoader(index);
      case 'card':
        return renderCardLoader(index);
      case 'article':
        return renderArticleLoader(index);
      default:
        return renderUserLoader(index);
    }
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {items.map((index) => renderLoader(index))}
    </div>
  );
};

export default ContentLoader;