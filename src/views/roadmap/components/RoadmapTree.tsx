import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SkillNode {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  position: { x: number; y: number };
  connections: string[];
}

interface RoadmapTreeProps {
  className?: string;
}

const defaultSkills: SkillNode[] = [
  {
    id: 'html',
    title: 'HTML',
    description: '网页结构的基础',
    completed: false,
    position: { x: 400, y: 50 },
    connections: ['css', 'accessibility']
  },
  {
    id: 'css',
    title: 'CSS',
    description: '网页样式的基础',
    completed: false,
    position: { x: 300, y: 150 },
    connections: ['javascript', 'responsive']
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: '网页交互的基础',
    completed: false,
    position: { x: 200, y: 250 },
    connections: ['react', 'vue']
  },
  {
    id: 'accessibility',
    title: '无障碍',
    description: '让所有人都能访问',
    completed: false,
    position: { x: 500, y: 150 },
    connections: ['seo']
  },
  {
    id: 'responsive',
    title: '响应式设计',
    description: '适配各种设备',
    completed: false,
    position: { x: 350, y: 250 },
    connections: ['frameworks']
  },
  {
    id: 'seo',
    title: 'SEO',
    description: '搜索引擎优化',
    completed: false,
    position: { x: 550, y: 250 },
    connections: ['analytics']
  },
  {
    id: 'react',
    title: 'React',
    description: '前端框架',
    completed: false,
    position: { x: 150, y: 350 },
    connections: ['redux']
  },
  {
    id: 'vue',
    title: 'Vue',
    description: '前端框架',
    completed: false,
    position: { x: 250, y: 350 },
    connections: ['vuex']
  },
  {
    id: 'frameworks',
    title: 'CSS框架',
    description: '快速构建UI',
    completed: false,
    position: { x: 350, y: 350 },
    connections: ['tailwind']
  },
  {
    id: 'analytics',
    title: '数据分析',
    description: '了解用户行为',
    completed: false,
    position: { x: 550, y: 350 },
    connections: []
  },
  {
    id: 'redux',
    title: 'Redux',
    description: '状态管理',
    completed: false,
    position: { x: 150, y: 450 },
    connections: ['fullstack']
  },
  {
    id: 'vuex',
    title: 'Vuex',
    description: '状态管理',
    completed: false,
    position: { x: 250, y: 450 },
    connections: ['fullstack']
  },
  {
    id: 'tailwind',
    title: 'Tailwind',
    description: '实用优先的CSS',
    completed: false,
    position: { x: 350, y: 450 },
    connections: ['fullstack']
  },
  {
    id: 'fullstack',
    title: '全栈开发',
    description: '前后端结合',
    completed: false,
    position: { x: 250, y: 550 },
    connections: []
  },
];

export function RoadmapTree({ className }: RoadmapTreeProps) {
  const [skills, setSkills] = useState<SkillNode[]>(defaultSkills);

  const toggleSkill = (id: string) => {
    setSkills(prevSkills =>
      prevSkills.map(skill =>
        skill.id === id ? { ...skill, completed: !skill.completed } : skill
      )
    );
  };

  // 计算两个节点之间的路径
  const getPath = (from: SkillNode, to: SkillNode) => {
    const fromX = from.position.x;
    const fromY = from.position.y;
    const toX = to.position.x;
    const toY = to.position.y;
    
    // 创建曲线路径
    const midY = (fromY + toY) / 2;
    return `M${fromX},${fromY} C${fromX},${midY} ${toX},${midY} ${toX},${toY}`;
  };

  return (
    <div className={cn('relative w-full h-[800px] overflow-auto', className)}>
      <svg className="absolute top-0 left-0 w-full h-full">
        {/* 绘制连接线 */}
        {skills.map(skill =>
          skill.connections.map(targetId => {
            const targetSkill = skills.find(s => s.id === targetId);
            if (!targetSkill) return null;
            
            const path = getPath(skill, targetSkill);
            const isCompleted = skill.completed && targetSkill.completed;
            
            return (
              <path
                key={`${skill.id}-${targetId}`}
                d={path}
                fill="none"
                stroke={isCompleted ? '#10b981' : '#6b7280'}
                strokeWidth={3}
                strokeDasharray={isCompleted ? '0' : '5,5'}
                className="transition-all duration-300"
              />
            );
          })
        )}
        
        {/* 绘制节点 */}
        {skills.map(skill => (
          <g key={skill.id} transform={`translate(${skill.position.x - 40}, ${skill.position.y - 40})`}>
            <circle
              cx="40"
              cy="40"
              r="35"
              className={cn(
                'transition-all duration-300 cursor-pointer',
                skill.completed ? 'fill-green-500 stroke-green-600' : 'fill-gray-700 stroke-gray-600'
              )}
              onClick={() => toggleSkill(skill.id)}
            />
            <text
              x="40"
              y="45"
              textAnchor="middle"
              className="fill-white text-sm font-medium"
            >
              {skill.title}
            </text>
          </g>
        ))}
      </svg>
      
      {/* 技能详情 */}
      <div className="absolute bottom-4 left-4 p-4 bg-card rounded-lg shadow-lg border max-w-xs">
        <h3 className="font-bold text-lg mb-2">学习路线图</h3>
        <p className="text-sm text-muted-foreground mb-4">点击节点来标记完成状态</p>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-700"></div>
          <span className="text-sm">未完成</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm">已完成</span>
        </div>
      </div>
    </div>
  );
}