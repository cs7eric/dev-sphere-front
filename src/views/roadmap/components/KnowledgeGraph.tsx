import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Circle, AlertCircle, Book, Video, FileText, ExternalLink, Info, Clock, Award, ChevronRight, Network } from 'lucide-react';
import { roadmapData, defaultRoadmapId } from '@/mock/roadmap';

// 知识图谱节点接口
interface MindMapNode {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  position?: { x: number; y: number };
  style?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    iconName?: string;
  };
  details?: {
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    estimatedHours?: number;
    resources?: Array<{
      title: string;
      url: string;
      type: 'article' | 'video' | 'course' | 'book' | 'documentation';
    }>;
    skills?: string[];
  };
  children?: MindMapNode[];
}

// 知识图谱数据结构
interface MindMapData {
  id: string;
  title: string;
  description: string;
  rootNode: MindMapNode;
}

interface KnowledgeGraphProps {
  className?: string;
}

// 获取图标组件
const getIconComponent = (iconName: string | undefined) => {
  switch (iconName) {
    case 'Code': return <div className="w-4 h-4 flex items-center justify-center">{'</>'}</div>;
    case 'FileCode': return <div className="w-4 h-4 flex items-center justify-center">{'{ }'}</div>;
    case 'FileJs': return <div className="w-4 h-4 flex items-center justify-center">{'JS'}</div>;
    case 'Layers': return <div className="w-4 h-4 flex items-center justify-center">{'⚛️'}</div>;
    case 'Package': return <div className="w-4 h-4 flex items-center justify-center">{'📦'}</div>;
    case 'Server': return <div className="w-4 h-4 flex items-center justify-center">{'🖥️'}</div>;
    case 'Smartphone': return <div className="w-4 h-4 flex items-center justify-center">{'📱'}</div>;
    default: return null;
  }
};

// 获取难度标签颜色
const getDifficultyColor = (difficulty: string | undefined) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

// 获取资源类型图标
const getResourceIcon = (type: string) => {
  switch (type) {
    case 'article': return <FileText className="w-3 h-3" />;
    case 'video': return <Video className="w-3 h-3" />;
    case 'course': return <Award className="w-3 h-3" />;
    case 'book': return <Book className="w-3 h-3" />;
    case 'documentation': return <FileText className="w-3 h-3" />;
    default: return <Info className="w-3 h-3" />;
  }
};

// 构建知识图谱节点位置 - 使用力导向布局算法的简化版本
const buildNodePositions = (node: MindMapNode, startX: number, startY: number, horizontalGap: number, verticalGap: number, level: number = 0): MindMapNode => {
  // 如果节点已有位置，则不重新计算
  if (node.position) {
    return node;
  }

  // 设置当前节点位置
  const updatedNode = {
    ...node,
    position: { x: startX, y: startY }
  };

  // 如果有子节点，设置子节点位置 - 使用圆形布局而非树形布局
  if (node.children && node.children.length > 0) {
    const childCount = node.children.length;
    const radius = horizontalGap * 1.2; // 圆的半径
    const angleStep = (2 * Math.PI) / childCount; // 均匀分布在圆周上
    
    updatedNode.children = node.children.map((child, index) => {
      // 计算在圆周上的位置
      const angle = index * angleStep;
      const childX = startX + radius * Math.cos(angle);
      const childY = startY + radius * Math.sin(angle);
      
      // 递归设置子节点的子节点位置
      const childWithPosition = {
        ...child,
        position: { x: childX, y: childY }
      };
      
      // 如果子节点有自己的子节点，递归处理
      if (child.children && child.children.length > 0) {
        return {
          ...childWithPosition,
          children: child.children.map((grandChild, grandChildIndex) => {
            // 为每个孙节点计算一个小偏移，使其围绕父节点
            const grandChildAngle = angle + (grandChildIndex - (child.children!.length - 1) / 2) * 0.3;
            const grandChildRadius = radius * 0.6;
            const grandChildX = childX + grandChildRadius * Math.cos(grandChildAngle);
            const grandChildY = childY + grandChildRadius * Math.sin(grandChildAngle);
            
            return {
              ...grandChild,
              position: { x: grandChildX, y: grandChildY }
            };
          })
        };
      }
      
      return childWithPosition;
    });
  }

  return updatedNode;
};

// 计算节点之间的连接路径 - 为知识图谱优化的连接线
const getConnectionPath = (parent: MindMapNode, child: MindMapNode) => {
  if (!parent.position || !child.position) return '';

  const parentX = parent.position.x;
  const parentY = parent.position.y;
  const childX = child.position.x;
  const childY = child.position.y;

  // 计算两点之间的距离和角度
  const dx = childX - parentX;
  const dy = childY - parentY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // 为知识图谱创建更自然的曲线路径
  // 使用二次贝塞尔曲线，控制点偏离直线连接
  const midX = (parentX + childX) / 2;
  const midY = (parentY + childY) / 2;
  
  // 添加一些随机偏移，使连接看起来更自然
  const offset = distance * 0.2;
  const offsetX = midX + (Math.random() - 0.5) * offset;
  const offsetY = midY + (Math.random() - 0.5) * offset;
  
  return `M${parentX},${parentY} Q${offsetX},${offsetY} ${childX},${childY}`;
};

// 渲染知识图谱节点及其连接线
const renderNodeAndConnections = (
  node: MindMapNode, 
  toggleNodeComplete: (nodeId: string) => void, 
  selectNode: (node: MindMapNode | null) => void,
  selectedNode: MindMapNode | null,
  allNodes: MindMapNode[] = []
) => {
  if (!node.position) return null;

  const isSelected = selectedNode?.id === node.id;
  const nodeElements = [];

  // 渲染当前节点的所有连接线 - 包括子节点和关系连接
  
  // 1. 渲染到子节点的连接线
  if (node.children) {
    node.children.forEach(child => {
      if (child.position) {
        const path = getConnectionPath(node, child);
        const isCompleted = node.completed && child.completed;
        
        nodeElements.push(
          <g key={`${node.id}-${child.id}`}>
            {/* 连接线阴影效果 */}
            {isCompleted && (
              <path
                d={path}
                fill="none"
                stroke="rgba(16, 185, 129, 0.2)"
                strokeWidth={6}
                className="transition-all duration-300"
              />
            )}
            {/* 主连接线 */}
            <path
              d={path}
              fill="none"
              stroke={isCompleted ? '#a78bfa' : '#6b7280'}
              strokeWidth={3}
              strokeDasharray={isCompleted ? '0' : '6,4'}
              className="transition-all duration-500"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={isCompleted ? 'url(#glow)' : ''}
              opacity={isCompleted ? 0.8 : 0.5}
            />
            {/* 关系标签 - 子节点关系默认为"包含" */}
            <text
              x={(node.position.x + child.position.x) / 2}
              y={(node.position.y + child.position.y) / 2 - 8}
              textAnchor="middle"
              className="text-xs fill-gray-300 pointer-events-none select-none"
              transform={`rotate(${Math.atan2(child.position.y - node.position.y, child.position.x - node.position.x) * 180 / Math.PI}, ${(node.position.x + child.position.x) / 2}, ${(node.position.y + child.position.y) / 2})`}
              opacity="0.7"
            >
              包含
            </text>
          </g>
        );
      }
    });
  }
  
  // 2. 渲染关系连接线 - 知识图谱特有的节点间关系
  if (node.relations) {
    node.relations.forEach(relation => {
      // 查找目标节点
      const targetNode = allNodes.find(n => n.id === relation.targetId);
      if (targetNode && targetNode.position && node.position) {
        const path = getConnectionPath(node, targetNode);
        
        // 根据关系类型设置不同的样式
        let strokeColor = '#6b7280';
        let strokeWidth = 2;
        let dashArray = '3,3';
        
        switch (relation.type) {
          case 'prerequisite':
            strokeColor = '#f59e0b'; // 橙色
            dashArray = '5,3';
            break;
          case 'related':
            strokeColor = '#60a5fa'; // 亮蓝色
            dashArray = '3,3';
            break;
          case 'leads_to':
            strokeColor = '#a78bfa'; // 紫色 - Obsidian主色调
            dashArray = '0';
            strokeWidth = 3;
            break;
          case 'includes':
            strokeColor = '#c4b5fd'; // 浅紫色
            dashArray = '7,3';
            break;
          case 'similar_to':
            strokeColor = '#f0abfc'; // 亮粉色
            dashArray = '2,2';
            break;
        }
        
        nodeElements.push(
          <g key={`relation-${node.id}-${targetNode.id}`}>
            {/* 关系连接线 */}
            <path
              d={path}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              className="transition-all duration-300"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
              filter="url(#glow)"
              opacity="0.7"
            />
            {/* 关系标签 */}
            <text
              x={(node.position.x + targetNode.position.x) / 2}
              y={(node.position.y + targetNode.position.y) / 2 - 8}
              textAnchor="middle"
              className="text-xs fill-gray-300 font-medium pointer-events-none select-none px-1"
              style={{ textShadow: '0 0 3px rgba(0,0,0,0.8)' }}
            >
              {relation.label || relation.type.replace('_', ' ')}
            </text>
          </g>
        );
      }
    });
  }

  // 渲染当前节点 - Obsidian风格
  const nodeSize = 60; // 增大节点尺寸
  const nodeX = node.position.x;
  const nodeY = node.position.y;
  // Obsidian风格的节点颜色
  const bgColor = node.style?.backgroundColor || (node.completed ? '#a78bfa' : '#1e293b');
  const borderColor = node.style?.borderColor || (node.completed ? '#8b5cf6' : '#334155');
  const textColor = node.style?.textColor || '#ffffff';
  // 删除这里重复声明的isSelected变量

  nodeElements.push(
    <g 
      key={node.id} 
      transform={`translate(${nodeX - nodeSize/2}, ${nodeY - nodeSize/2})`}
      className={`cursor-pointer transition-all duration-300 ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node);
      }}
    >
      {/* 节点阴影效果 */}
      {/* Obsidian风格的节点阴影 */}
      <circle
        cx={nodeSize/2}
        cy={nodeSize/2}
        r={nodeSize/2 - 2}
        fill="rgba(0,0,0,0.3)"
        transform="translate(3, 3)"
        className="opacity-60"
      />
      {/* 节点主体 - 改为圆形 */}
      <circle
        cx={nodeSize/2}
        cy={nodeSize/2}
        r={nodeSize/2 - 2}
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={isSelected ? 3 : 2}
        className={`transition-all duration-300 ${isSelected ? 'stroke-purple-400' : ''}`}
        filter={isSelected || node.completed ? 'url(#node-glow)' : ''}
      />
      <foreignObject width={nodeSize} height={nodeSize}>
        <div className="w-full h-full flex flex-col items-center justify-center p-1 overflow-hidden">
          {node.style?.iconName && (
            <div className="text-white mb-1 transition-transform duration-200 transform scale-110">
              {getIconComponent(node.style.iconName)}
            </div>
          )}
          <div 
            className="text-center text-xs font-medium truncate w-full transition-all duration-200" 
            style={{ color: textColor, textShadow: '0 0 3px rgba(0,0,0,0.5)' }}
          >
            {node.title}
          </div>
        </div>
      </foreignObject>
      {/* 完成状态指示器 - 更美观的设计 */}
      <g
        className="cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          toggleNodeComplete(node.id);
        }}
      >
        <circle
          cx={nodeSize - 8}
          cy={8}
          r={10}
          fill={node.completed ? '#a78bfa' : '#4b5563'}
          stroke="#ffffff"
          strokeWidth={2}
          className={`transition-all duration-300 ${node.completed ? 'shadow-sm shadow-purple-500/50' : ''}`}
          filter={node.completed ? 'url(#node-glow)' : ''}
        >
          <title>{node.completed ? '已完成' : '标记为完成'}</title>
        </circle>
        {node.completed ? (
          <CheckCircle className="w-4 h-4 text-white animate-pulse" x={nodeSize - 10} y={6} />
        ) : (
          <Circle className="w-4 h-4 text-white" x={nodeSize - 10} y={6} />
        )}
      </g>
    </g>
  );

  // 递归渲染子节点
  if (node.children) {
    node.children.forEach(child => {
      const childElements = renderNodeAndConnections(child, toggleNodeComplete, selectNode, selectedNode, allNodes);
      if (childElements) {
        nodeElements.push(...childElements);
      }
    });
  }

  return nodeElements;
};

export function KnowledgeGraph({ className }: KnowledgeGraphProps) {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(defaultRoadmapId);
  const [rootNode, setRootNode] = useState<MindMapNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState<string>('0 0 1000 600');
  const [pan, setPan] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);

  // 初始化路线图数据
  // 收集所有节点到一个扁平数组，用于关系连接
  const collectAllNodes = (node: MindMapNode): MindMapNode[] => {
    let nodes: MindMapNode[] = [node];
    if (node.children) {
      node.children.forEach(child => {
        nodes = [...nodes, ...collectAllNodes(child)];
      });
    }
    return nodes;
  };
  
  // 所有节点的扁平列表
  const [allNodes, setAllNodes] = useState<MindMapNode[]>([]);

  useEffect(() => {
    const roadmap = roadmapData[selectedRoadmapId as keyof typeof roadmapData];
    if (roadmap) {
      // 计算节点位置
      const horizontalGap = 200; // 水平间距
      const verticalGap = 100;   // 垂直间距
      const startX = 200;        // 起始X坐标
      const startY = 300;        // 起始Y坐标

      const rootNodeWithPositions = buildNodePositions(
        roadmap.rootNode, 
        startX, 
        startY, 
        horizontalGap, 
        verticalGap
      );
      
      setRootNode(rootNodeWithPositions);
      setSelectedNode(null);
      
      // 收集所有节点到扁平数组
      setAllNodes(collectAllNodes(rootNodeWithPositions));
    }
  }, [selectedRoadmapId]);

  // 切换节点完成状态
  const toggleNodeComplete = (nodeId: string) => {
    if (!rootNode) return;

    // 递归查找并更新节点
    const updateNodeComplete = (node: MindMapNode): MindMapNode => {
      if (node.id === nodeId) {
        return { ...node, completed: !node.completed };
      }

      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNodeComplete)
        };
      }

      return node;
    };

    setRootNode(updateNodeComplete(rootNode));

    // 如果当前选中的节点被更新，也更新选中节点的状态
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, completed: !prev.completed } : null);
    }
  };

  // 处理拖拽开始
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button === 0) { // 只处理左键点击
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // 处理拖拽移动
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging && dragStart) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // 处理拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  // 处理鼠标滚轮缩放
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1; // 缩小或放大
    setZoom(prev => Math.max(0.5, Math.min(2, prev * scaleFactor))); // 限制缩放范围
  };

  // 重置视图
  const resetView = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      {/* 知识领域选择器 */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg border shadow-sm">
        <Tabs value={selectedRoadmapId} onValueChange={setSelectedRoadmapId} className="w-full md:w-auto">
          <TabsList className="w-full md:w-auto grid grid-cols-3 h-10">
            <TabsTrigger 
              value="frontend" 
              className={`transition-all duration-300 ${selectedRoadmapId === 'frontend' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm' : ''}`}
            >
              <div className="w-4 h-4 mr-1.5 text-blue-500">{'</>'}</div>
              前端开发
            </TabsTrigger>
            <TabsTrigger 
              value="backend" 
              className={`transition-all duration-300 ${selectedRoadmapId === 'backend' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm' : ''}`}
            >
              <div className="w-4 h-4 mr-1.5 text-purple-500">{'🖥️'}</div>
              后端开发
            </TabsTrigger>
            <TabsTrigger 
              value="mobile" 
              className={`transition-all duration-300 ${selectedRoadmapId === 'mobile' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 shadow-sm' : ''}`}
            >
              <div className="w-4 h-4 mr-1.5 text-red-500">{'📱'}</div>
              移动开发
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex space-x-2 w-full md:w-auto justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetView}
            className="transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            重置视图
          </Button>
        </div>
      </div>

      {/* 知识图谱区域 - Obsidian风格 */}
      <div className="relative border rounded-lg overflow-hidden bg-gray-900 h-[600px] shadow-inner">
        {/* 背景网格 - 模拟Obsidian风格 */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(120,120,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
        <svg
          ref={svgRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          viewBox={viewBox}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onClick={() => setSelectedNode(null)}
        >
          {/* 定义箭头标记和滤镜 - Obsidian风格 */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa" />
            </marker>
            
            {/* 发光效果滤镜 - Obsidian风格 */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* 节点发光效果 */}
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
            {rootNode && renderNodeAndConnections(rootNode, toggleNodeComplete, setSelectedNode, selectedNode, allNodes)}
          </g>
        </svg>

        {/* 缩放控制 - 改进样式 */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-1 flex items-center border border-gray-200 dark:border-gray-700">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-gray-700 text-gray-300 hover:text-purple-300 transition-all duration-200"
              onClick={() => setZoom(prev => Math.max(0.5, prev * 0.8))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </Button>
            <div className="px-2 text-sm font-medium">{Math.round(zoom * 100)}%</div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-gray-700 text-gray-300 hover:text-purple-300 transition-all duration-200"
              onClick={() => setZoom(prev => Math.min(2, prev * 1.2))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </Button>
          </div>
        </div>
      </div>

      {/* 节点详情面板 - Obsidian风格 */}
      {selectedNode && (
        <Card className="p-5 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-lg border border-purple-800/50 overflow-hidden relative bg-gray-900 text-gray-100" 
          style={{ borderTopColor: selectedNode.style?.backgroundColor || (selectedNode.completed ? '#a78bfa' : '#374151'), boxShadow: '0 0 15px rgba(167, 139, 250, 0.2)' }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10 -rotate-12 transform translate-x-8 -translate-y-8 text-purple-400">
            {selectedNode.style?.iconName && getIconComponent(selectedNode.style.iconName)}
          </div>
          
          {/* Obsidian风格的发光效果 */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
          
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2 text-purple-200">
                {selectedNode.completed && <CheckCircle className="w-5 h-5 text-purple-400" />}
                {selectedNode.title}
              </h3>
              <p className="text-sm text-gray-300 mt-1">{selectedNode.description}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-800 hover:text-purple-300 transition-all duration-200 text-gray-300"
              onClick={() => setSelectedNode(null)}
            >
              ×
            </Button>
          </div>

          <div className="mt-5 space-y-5">
            {/* 难度和预计时间 */}
            {selectedNode.details && (
              <div className="flex flex-wrap gap-2">
                {selectedNode.details.difficulty && (
                  <Badge variant="outline" className={`${getDifficultyColor(selectedNode.details.difficulty)} px-3 py-1 transition-all duration-200 hover:scale-105`}>
                    <Award className="w-3.5 h-3.5 mr-1.5" />
                    {selectedNode.details.difficulty === 'beginner' ? '初级' : 
                     selectedNode.details.difficulty === 'intermediate' ? '中级' : '高级'}
                  </Badge>
                )}
                {selectedNode.details.estimatedHours && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 transition-all duration-200 hover:scale-105">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    预计 {selectedNode.details.estimatedHours} 小时
                  </Badge>
                )}
              </div>
            )}

            {/* 技能标签 */}
            {selectedNode.details?.skills && selectedNode.details.skills.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-1.5 text-blue-500" />
                  相关技能
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.details.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs py-1 px-2 transition-all duration-200 hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 学习资源 */}
            {selectedNode.details?.resources && selectedNode.details.resources.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Book className="w-4 h-4 mr-1.5 text-green-500" />
                  学习资源
                </h4>
                <div className="space-y-2">
                  {selectedNode.details.resources.map((resource, index) => (
                    <a 
                      key={index} 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 text-blue-600 dark:text-blue-400">
                        {getResourceIcon(resource.type)}
                      </div>
                      <span className="flex-1">{resource.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1 flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 子节点列表 */}
            {selectedNode.children && selectedNode.children.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-purple-500" />
                  子节点
                </h4>
                <div className="space-y-1.5">
                  {selectedNode.children.map(child => (
                    <div 
                      key={child.id}
                      onClick={() => selectNode(child)}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                    >
                      {child.completed ? 
                        <CheckCircle className="w-4 h-4 mr-2 text-purple-400" /> : 
                        <Circle className="w-4 h-4 mr-2 text-gray-500" />
                      }
                      <span className="text-sm">{child.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 关联节点列表 - 知识图谱特有 */}
            {selectedNode.relations && selectedNode.relations.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Network className="w-4 h-4 mr-1.5 text-blue-500" />
                  知识关联
                </h4>
                <div className="space-y-1.5">
                  {selectedNode.relations.map((relation, index) => {
                    const targetNode = allNodes.find(node => node.id === relation.targetId);
                    if (!targetNode) return null;
                    
                    // 根据关系类型设置不同的样式
                    let badgeColor = '';
                    let relationLabel = relation.label || '';
                    
                    switch (relation.type) {
                      case 'prerequisite':
                        badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
                        relationLabel = relationLabel || '前置知识';
                        break;
                      case 'related':
                        badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
                        relationLabel = relationLabel || '相关知识';
                        break;
                      case 'leads_to':
                        badgeColor = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
                        relationLabel = relationLabel || '进阶知识';
                        break;
                      case 'includes':
                        badgeColor = 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
                        relationLabel = relationLabel || '包含';
                        break;
                      case 'similar_to':
                        badgeColor = 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
                        relationLabel = relationLabel || '相似知识';
                        break;
                      default:
                        badgeColor = 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
                    }
                    
                    return (
                      <div 
                        key={`relation-${index}`}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                        onClick={() => selectNode(targetNode)}
                      >
                        <div className="flex items-center">
                          {targetNode.completed ? 
                            <CheckCircle className="w-4 h-4 mr-2 text-purple-400" /> : 
                            <Circle className="w-4 h-4 mr-2 text-gray-500" />
                          }
                          <span className="text-sm">{targetNode.title}</span>
                        </div>
                        <Badge variant="outline" className={`${badgeColor} text-xs`}>
                          {relationLabel}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 完成状态切换 */}
            <Button 
              variant={selectedNode.completed ? "outline" : "default"}
              size="sm"
              onClick={() => toggleNodeComplete(selectedNode.id)}
              className={`mt-2 w-full transition-all duration-300 ${selectedNode.completed ? 'border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {selectedNode.completed ? (
                <>
                  <Circle className="w-4 h-4 mr-2" />
                  标记为未完成
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  标记为已完成
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* 图例说明 - Obsidian风格 */}
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 shadow-md relative overflow-hidden">
        {/* 背景发光效果 */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/5 blur-3xl pointer-events-none"></div>
        <h4 className="font-medium text-sm mb-3 flex items-center text-purple-200">
          <Network className="w-4 h-4 mr-1.5 text-purple-400" />
          知识图谱说明
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-gray-300">
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-500/30">
              <CheckCircle className="w-3 h-3" />
            </div>
            <span>已完成节点</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-white shadow-sm">
              <Circle className="w-3 h-3" />
            </div>
            <span>未完成节点</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-10 h-1.5 bg-purple-500 rounded-full shadow-sm shadow-purple-500/30"></div>
            </div>
            <span>已完成路径</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-10 h-1.5 bg-gray-500 rounded-full" style={{ backgroundImage: 'linear-gradient(90deg, #6b7280 50%, transparent 50%)', backgroundSize: '8px 1px' }}></div>
            </div>
            <span>未完成路径</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="flex items-center gap-1">
              <Badge variant="outline" className={`${getDifficultyColor('beginner')} px-2`}>
                初级
              </Badge>
            </div>
            <span>难度等级</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-sm shadow-purple-500/30">
              <Info className="w-3 h-3" />
            </div>
            <span>点击节点查看详情</span>
          </div>
        </div>
      </div>
    </div>
  );
}