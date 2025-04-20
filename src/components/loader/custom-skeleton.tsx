import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";

interface CustomSkeletonProps {
  width?: string;
  height?: string;
  rows?: number;
  className?: string;
}

/**
 * 自定义Skeleton组件
 * 可以根据传入的宽度、高度和行数生成多个骨架加载元素
 * 
 * @param width - 骨架元素的宽度，默认为'24px'
 * @param height - 骨架元素的高度，默认为'24px'
 * @param rows - 骨架元素的行数，默认为1
 * @param className - 额外的CSS类名
 */
const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
  width = '24px',
  height = '24px',
  rows = 1,
  className,
}) => {
  // 创建指定行数的skeleton数组
  const skeletons = Array.from({ length: rows }, (_, index) => index);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      {skeletons.map((index) => (
        <div 
          key={index}
          className="flex items-center justify-center"
        >
          <Skeleton 
            style={{ width, height }}
            className="rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default CustomSkeleton;