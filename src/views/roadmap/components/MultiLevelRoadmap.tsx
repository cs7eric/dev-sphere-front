import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, AlertCircle, ChevronRight } from 'lucide-react';

// 基础节点接口，所有级别的节点都继承此接口
interface RoadmapNodeBase {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// 递归定义节点类型，每个节点可以包含子节点
interface RoadmapNode extends RoadmapNodeBase {
  children?: RoadmapNode[];
}

interface MultiLevelRoadmapProps {
  className?: string;
  nodes?: RoadmapNode[];
  onNodeComplete?: (nodeId: string, completed: boolean, path?: string[]) => void;
}

// 示例数据
const defaultNodes: RoadmapNode[] = [
  {
    id: 'basics',
    title: 'Web 基础',
    description: 'HTML, CSS 和 JavaScript 基础知识',
    completed: false,
    children: [
      {
        id: 'html',
        title: 'HTML',
        description: '网页结构的基础',
        completed: false,
        children: [
          {
            id: 'html-basics',
            title: 'HTML基础',
            description: '标签、属性和元素',
            completed: false,
            children: [
              {
                id: 'html-tags',
                title: 'HTML标签',
                description: '常用HTML标签及其用法',
                completed: false
              },
              {
                id: 'html-attributes',
                title: 'HTML属性',
                description: '标签属性及其作用',
                completed: false
              }
            ]
          },
          {
            id: 'html-forms',
            title: 'HTML表单',
            description: '创建交互式表单',
            completed: false
          },
          {
            id: 'html-semantics',
            title: '语义化HTML',
            description: '使用正确的标签表达内容含义',
            completed: false
          }
        ]
      },
      {
        id: 'css',
        title: 'CSS',
        description: '网页样式的基础',
        completed: false,
        children: [
          {
            id: 'css-selectors',
            title: 'CSS选择器',
            description: '选择和样式化HTML元素',
            completed: false
          },
          {
            id: 'css-layout',
            title: 'CSS布局',
            description: 'Flexbox和Grid布局',
            completed: false,
            children: [
              {
                id: 'css-flexbox',
                title: 'Flexbox布局',
                description: '一维弹性布局',
                completed: false
              },
              {
                id: 'css-grid',
                title: 'Grid布局',
                description: '二维网格布局',
                completed: false
              }
            ]
          },
          {
            id: 'css-animations',
            title: 'CSS动画',
            description: '创建过渡和动画效果',
            completed: false
          }
        ]
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        description: '网页交互的基础',
        completed: false,
        children: [
          {
            id: 'js-basics',
            title: 'JS基础',
            description: '变量、函数和控制流',
            completed: false
          },
          {
            id: 'js-dom',
            title: 'DOM操作',
            description: '与网页元素交互',
            completed: false
          },
          {
            id: 'js-async',
            title: '异步JavaScript',
            description: 'Promise和async/await',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'frontend-frameworks',
    title: '前端框架',
    description: 'React, Vue 或 Angular',
    completed: false,
    children: [
      {
        id: 'react',
        title: 'React',
        description: '组件化UI库',
        completed: false,
        children: [
          {
            id: 'react-components',
            title: 'React组件',
            description: '函数组件和类组件',
            completed: false
          },
          {
            id: 'react-hooks',
            title: 'React Hooks',
            description: '状态和副作用管理',
            completed: false
          },
          {
            id: 'react-router',
            title: 'React Router',
            description: '客户端路由管理',
            completed: false
          }
        ]
      },
      {
        id: 'vue',
        title: 'Vue',
        description: '渐进式JavaScript框架',
        completed: false
      },
      {
        id: 'angular',
        title: 'Angular',
        description: '完整的前端MVC框架',
        completed: false
      }
    ]
  }
];

// 递归节点组件
interface NodeLevelProps {
  nodes: RoadmapNode[];
  level: number;
  selectedPath: string[];
  onNodeSelect: (nodeId: string, level: number) => void;
  onNodeComplete: (nodeId: string, completed: boolean, path: string[]) => void;
  canCompleteNode: (node: RoadmapNode, path: string[]) => boolean;
  className?: string;
  isAnimating: boolean;
}

const NodeLevel: React.FC<NodeLevelProps> = ({
  nodes,
  level,
  selectedPath,
  onNodeSelect,
  onNodeComplete,
  canCompleteNode,
  className,
  isAnimating
}) => {
  // 当前级别是否被选中
  const isLevelSelected = selectedPath.length >= level;
  // 当前级别选中的节点ID
  const selectedNodeId = selectedPath[level - 1];

  return (
    <div 
      className={cn(
        'transition-all duration-300 ease-in-out',
        isLevelSelected && level < selectedPath.length ? 'flex-[0.6]' : 'flex-1',
        isAnimating ? 'opacity-90' : 'opacity-100',
        level > 1 ? 'border-l border-gray-200 dark:border-gray-800 pl-6' : '',
        className
      )}
    >
      {/* 垂直线 */}
      <div className="relative">
        <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
        
        {/* 节点列表 */}
        <div className="space-y-4 relative z-10">
          {nodes.map((node, index) => {
            const nodePath = selectedPath.slice(0, level - 1).concat(node.id);
            const isCompletable = canCompleteNode(node, nodePath);
            const isCompleted = node.completed;
            const isSelected = selectedNodeId === node.id;
            const hasChildren = node.children && node.children.length > 0;
            
            return (
              <div key={node.id} className="flex items-start gap-3">
                {/* 节点图标 */}
                <button
                  onClick={() => onNodeComplete(node.id, !isCompleted, nodePath)}
                  disabled={!isCompletable && !isCompleted}
                  className={cn(
                    'relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200 flex-shrink-0 mt-1',
                    isCompleted ? 'bg-green-100 border-green-500 text-green-500' : 
                      isCompletable ? 'bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-500 hover:border-gray-400 dark:hover:border-gray-600' :
                      'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 cursor-not-allowed'
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : isCompletable ? (
                    <Circle className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                </button>
                
                {/* 节点内容 */}
                <div 
                  onClick={() => (isCompletable || isCompleted) && hasChildren ? onNodeSelect(node.id, level) : null}
                  className={cn(
                    'flex-1 p-3 rounded-lg border transition-all duration-200',
                    hasChildren && (isCompletable || isCompleted) ? 'cursor-pointer' : '',
                    isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : '',
                    isCompleted ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900' :
                      isCompletable ? 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700' :
                      'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 opacity-70'
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={cn(
                        'font-medium text-sm mb-0.5',
                        isCompleted ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'
                      )}>
                        {node.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{node.description}</p>
                    </div>
                    {hasChildren && (isCompletable || isCompleted) && (
                      <ChevronRight className={cn(
                        'w-4 h-4 text-gray-400 transition-transform',
                        isSelected ? 'rotate-90' : ''
                      )} />
                    )}
                  </div>
                  
                  {!isCompletable && !isCompleted && (
                    <div className="mt-1 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>完成前面的节点后才能解锁</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export function MultiLevelRoadmap({ 
  className, 
  nodes = defaultNodes,
  onNodeComplete: externalOnNodeComplete
}: MultiLevelRoadmapProps) {
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>(nodes);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [visibleNodes, setVisibleNodes] = useState<number>(1);

  // 检查节点是否可以被完成（前面的节点都已完成）
  const canCompleteNode = (node: RoadmapNode, path: string[]): boolean => {
    // 如果是第一级的第一个节点，总是可以完成
    if (path.length === 1 && path[0] === roadmapNodes[0].id) return true;
    
    // 如果是第一级的其他节点，检查前面的节点是否都已完成
    if (path.length === 1) {
      const index = roadmapNodes.findIndex(n => n.id === path[0]);
      if (index <= 0) return true;
      
      for (let i = 0; i < index; i++) {
        if (!roadmapNodes[i].completed) {
          return false;
        }
      }
      return true;
    }
    
    // 如果是子节点，检查父节点是否已完成或可完成
    const parentPath = path.slice(0, -1);
    const parentNode = findNodeByPath(roadmapNodes, parentPath);
    
    if (!parentNode || (!parentNode.completed && !canCompleteNode(parentNode, parentPath))) {
      return false;
    }
    
    // 检查同级前面的节点是否都已完成
    const siblings = findSiblingsByPath(roadmapNodes, path);
    const currentIndex = siblings.findIndex(n => n.id === path[path.length - 1]);
    
    if (currentIndex <= 0) return true;
    
    for (let i = 0; i < currentIndex; i++) {
      if (!siblings[i].completed) {
        return false;
      }
    }
    
    return true;
  };

  // 根据路径查找节点
  const findNodeByPath = (nodes: RoadmapNode[], path: string[]): RoadmapNode | null => {
    if (path.length === 0) return null;
    
    let currentNodes = nodes;
    let currentNode: RoadmapNode | null = null;
    
    for (let i = 0; i < path.length; i++) {
      const nodeId = path[i];
      currentNode = currentNodes.find(n => n.id === nodeId) || null;
      
      if (!currentNode) return null;
      if (i < path.length - 1) {
        if (!currentNode.children) return null;
        currentNodes = currentNode.children;
      }
    }
    
    return currentNode;
  };

  // 查找同级节点
  const findSiblingsByPath = (nodes: RoadmapNode[], path: string[]): RoadmapNode[] => {
    if (path.length === 0) return [];
    if (path.length === 1) return nodes;
    
    const parentPath = path.slice(0, -1);
    const parentNode = findNodeByPath(nodes, parentPath);
    
    return parentNode?.children || [];
  };

  // 递归更新节点状态
  const updateNodeByPath = (nodes: RoadmapNode[], path: string[], updateFn: (node: RoadmapNode) => RoadmapNode): RoadmapNode[] => {
    if (path.length === 0) return nodes;
    
    return nodes.map(node => {
      if (node.id === path[0]) {
        if (path.length === 1) {
          return updateFn(node);
        } else if (node.children) {
          return {
            ...node,
            children: updateNodeByPath(node.children, path.slice(1), updateFn)
          };
        }
      }
      return node;
    });
  };

  // 切换节点完成状态
  const toggleNodeComplete = (nodeId: string, completed: boolean, path: string[]) => {
    // 如果节点不能被完成，则不执行任何操作
    const node = findNodeByPath(roadmapNodes, path);
    if (!node || (!canCompleteNode(node, path) && !node.completed)) {
      return;
    }
    
    // 更新节点状态
    const updatedNodes = updateNodeByPath(roadmapNodes, path, node => ({
      ...node,
      completed
    }));
    
    // 如果取消完成状态，则所有子节点也必须取消完成状态
    let finalNodes = updatedNodes;
    if (!completed && node.children) {
      const updateChildrenCompleted = (nodes: RoadmapNode[]): RoadmapNode[] => {
        return nodes.map(n => ({
          ...n,
          completed: false,
          children: n.children ? updateChildrenCompleted(n.children) : undefined
        }));
      };
      
      finalNodes = updateNodeByPath(updatedNodes, path, node => ({
        ...node,
        children: node.children ? updateChildrenCompleted(node.children) : undefined
      }));
    }
    
    setRoadmapNodes(finalNodes);
    
    // 调用外部回调
    if (externalOnNodeComplete) {
      externalOnNodeComplete(nodeId, completed, path);
    }
  };

  // 选择节点，更新路径
  const handleNodeSelect = (nodeId: string, level: number) => {
    setIsAnimating(true);
    
    // 更新选中路径
    const newPath = selectedPath.slice(0, level - 1).concat(nodeId);
    
    // 如果点击的是当前选中的节点，则关闭该级别及以下的路径
    if (selectedPath[level - 1] === nodeId) {
      setSelectedPath(selectedPath.slice(0, level - 1));
    } else {
      setSelectedPath(newPath);
    }
    
    // 动画完成后重置状态
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // 获取指定级别的节点
  const getNodesForLevel = (level: number): RoadmapNode[] => {
    if (level === 1) return roadmapNodes;
    
    const path = selectedPath.slice(0, level - 1);
    const parentNode = findNodeByPath(roadmapNodes, path);
    
    return parentNode?.children || [];
  };

  // 计算要显示的级别数
  const levelsToShow = Math.max(1, selectedPath.length + 1);

  return (
    <div className={cn('relative', className)}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* 渲染每个级别的节点 */}
        {Array.from({ length: levelsToShow }).map((_, index) => {
          const level = index + 1;
          const nodes = getNodesForLevel(level);
          
          if (nodes.length === 0) return null;
          
          return (
            <NodeLevel
              key={`level-${level}`}
              nodes={nodes}
              level={level}
              selectedPath={selectedPath}
              onNodeSelect={handleNodeSelect}
              onNodeComplete={toggleNodeComplete}
              canCompleteNode={canCompleteNode}
              isAnimating={isAnimating}
            />
          );
        })}
      </div>
      
      {/* 图例说明 */}
      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <h4 className="font-medium text-xs mb-2">路线图说明</h4>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white">
              <CheckCircle className="w-2.5 h-2.5" />
            </div>
            <span>已完成节点</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-500">
              <Circle className="w-2.5 h-2.5" />
            </div>
            <span>可完成节点</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400">
              <AlertCircle className="w-2.5 h-2.5" />
            </div>
            <span>锁定节点（需要先完成前面的节点）</span>
          </div>
        </div>
      </div>
    </div>
  );
}