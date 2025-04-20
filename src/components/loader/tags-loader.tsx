import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";

interface TagsLoaderProps {
  tagWidth?: string;
  tagHeight?: string;
  className?: string;
}

/**
 * 标签加载器组件
 * 渲染一个4列6行的标签占位网格，共24个标签
 * 
 * @param tagWidth - 每个标签的宽度，默认为'80px'
 * @param tagHeight - 每个标签的高度，默认为'32px'
 * @param className - 额外的CSS类名
 */
const TagsLoader: React.FC<TagsLoaderProps> = ({
  tagWidth = '80px',
  tagHeight = '32px',
  className,
}) => {
  // 创建24个标签占位符（4列 x 6行）
  const tags = Array.from({ length: 24 }, (_, index) => index);

  return (
    <div className={cn('grid grid-cols-4 gap-3', className)}>
      {tags.map((index) => (
        <div 
          key={index}
          className="flex items-center justify-center"
        >
          <Skeleton 
            style={{ width: tagWidth, height: tagHeight }}
            className="rounded-full"
          />
        </div>
      ))}
    </div>
  );
};

export default TagsLoader;