import React from 'react';
import { cn } from '@/lib/utils';

interface CustomSpinnerProps {
  width?: string;
  height?: string;
  rows?: number;
  className?: string;
}

/**
 * 自定义Spinner组件
 * 可以根据传入的宽度、高度和行数生成多个spinner
 * 
 * @param width - spinner的宽度，默认为'24px'
 * @param height - spinner的高度，默认为'24px'
 * @param rows - spinner的行数，默认为1
 * @param className - 额外的CSS类名
 */
const CustomSpinner: React.FC<CustomSpinnerProps> = ({
  width = '24px',
  height = '24px',
  rows = 1,
  className,
}) => {
  // 创建指定行数的spinner数组
  const spinners = Array.from({ length: rows }, (_, index) => index);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      {spinners.map((index) => (
        <div 
          key={index}
          className="flex items-center justify-center"
          style={{ width, height }}
        >
          <svg
            className="animate-spin"
            style={{ width: '100%', height: '100%' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CustomSpinner;