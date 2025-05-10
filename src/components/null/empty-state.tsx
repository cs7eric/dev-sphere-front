import React from 'react';
import NullIcon from '@/assets/illstructions/null.svg'


const EmptyState = ({ text = '暂无内容', style, className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center  ${className}`}
      style={{
        padding: '16px',
        borderRadius: '8px',
        minHeight: '200px',
        ...style,
      }}
    >
      <img
        src={NullIcon}
        alt="Empty content"
        className="w-42 h-42 opacity-50"
      />
      <p className="mt-4 text-neutral-400 text-sm">{text}</p>
    </div>
  );
};

export default EmptyState;