import React from 'react';
import { KnowledgeGraph } from './KnowledgeGraph';

interface XMindRoadmapProps {
  className?: string;
}

/**
 * XMindRoadmap组件 - 知识图谱路线图的包装组件
 * 使用KnowledgeGraph组件实现路线图功能
 */
export function XMindRoadmap({ className }: XMindRoadmapProps) {
  return (
    <KnowledgeGraph className={className} />
  );
}