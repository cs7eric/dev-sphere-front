// components/ConditionalRender.tsx
import React from 'react';
import EmptyState from "@/components/null/empty-state";

/**
 * 条件渲染组件（支持多种数据类型）
 * @param {Object} props
 * @param {any} props.data - 要检查的数据（可以是数组、对象、字符串、数字等）
 * @param {ReactNode} props.children - 数据有效时渲染的内容
 * @param {ReactNode} [props.emptyComponent] - 自定义空状态组件（可选，默认使用 EmptyState）
 * @param {string} [props.emptyText] - 空状态提示文本（默认："暂无内容"）
 * @param {boolean | (data: any) => boolean} [props.condition] - 自定义条件判断（可选）
 */
const ConditionalRender = ({
                             data,
                             children,
                             emptyComponent,
                             emptyText = '暂无内容',
                             condition,
                           }) => {
  // 如果提供了自定义条件，优先使用
  if (typeof condition === 'function') {
    if (condition(data)) {
      return children;
    }
  } else if (condition !== undefined) {
    if (condition) {
      return children;
    }
  }
  // 否则，自动根据数据类型判断
  else {
    // 检查数组是否非空
    if (Array.isArray(data) && data.length > 0) {
      return children;
    }
    // 检查对象是否非空
    if (typeof data === 'object' && data !== null && Object.keys(data).length > 0) {
      return children;
    }
    // 检查字符串/数字是否有效
    if ((typeof data === 'string' && data.trim() !== '') || (typeof data === 'number' && !isNaN(data))) {
      return children;
    }
    // 检查布尔值
    if (typeof data === 'boolean') {
      return children;
    }
  }

  // 使用自定义空状态组件（如果提供了）
  if (emptyComponent) {
    return emptyComponent;
  }

  // 默认空状态
  return <EmptyState text={emptyText} />;
};

export default ConditionalRender;