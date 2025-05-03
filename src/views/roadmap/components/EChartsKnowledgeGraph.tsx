import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Circle, AlertCircle, Book, Video, FileText, ExternalLink, Info, Clock, Award, ChevronRight, Network } from 'lucide-react';
import { roadmapData, defaultRoadmapId } from '@/mock/roadmap';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

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
  relations?: Array<{
    targetId: string; // 目标节点ID
    type: 'prerequisite' | 'related' | 'leads_to' | 'includes' | 'similar_to'; // 关系类型
    label?: string; // 关系标签
    strength?: number; // 关系强度 (0-1)
  }>;
}

// 知识图谱数据结构
interface MindMapData {
  id: string;
  title: string;
  description: string;
  rootNode: MindMapNode;
}

interface EChartsKnowledgeGraphProps {
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

// 将MindMapNode转换为ECharts图表数据
const convertToEChartsData = (rootNode: MindMapNode) => {
  const nodes: any[] = [];
  const links: any[] = [];
  const categories: any[] = [
    { name: '前端基础' },
    { name: '框架' },
    { name: '工具' },
    { name: '进阶技术' },
  ];

  // 递归处理节点
  const processNode = (node: MindMapNode, parentId: string | null = null, depth: number = 0) => {
    // 节点样式
    const bgColor = node.style?.backgroundColor || (node.completed ? '#10b981' : '#374151');
    const symbolSize = Math.max(40, 70 - depth * 10); // 根据深度调整节点大小
    
    // 添加节点
    nodes.push({
      id: node.id,
      name: node.title,
      value: node.description,
      symbolSize: symbolSize,
      itemStyle: {
        color: bgColor,
        borderColor: node.style?.borderColor || (node.completed ? '#059669' : '#1f2937'),
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'right',
        formatter: node.title,
        fontSize: 12,
        color: '#fff'
      },
      category: depth % categories.length,
      completed: node.completed,
      tooltip: {
        formatter: `<div><strong>${node.title}</strong><br/>${node.description}</div>`
      }
    });

    // 添加父子关系连接
    if (parentId) {
      links.push({
        source: parentId,
        target: node.id,
        lineStyle: {
          color: node.completed ? '#10b981' : '#6b7280',
          width: node.completed ? 3 : 2,
          type: node.completed ? 'solid' : 'dashed',
          curveness: 0.1
        },
        label: {
          show: false,
          formatter: '包含',
          fontSize: 10
        },
        tooltip: {
          formatter: '包含关系'
        }
      });
    }

    // 处理子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        processNode(child, node.id, depth + 1);
      });
    }

    // 处理关系连接
    if (node.relations && node.relations.length > 0) {
      node.relations.forEach(relation => {
        // 根据关系类型设置不同的样式
        let lineColor = '#6b7280';
        let lineType = 'dashed';
        let lineWidth = 2;
        let curveness = 0.2;
        
        switch (relation.type) {
          case 'prerequisite':
            lineColor = '#f59e0b'; // 橙色
            lineWidth = 2;
            break;
          case 'related':
            lineColor = '#3b82f6'; // 蓝色
            curveness = 0.3;
            break;
          case 'leads_to':
            lineColor = '#10b981'; // 绿色
            lineType = 'solid';
            lineWidth = 3;
            break;
          case 'includes':
            lineColor = '#8b5cf6'; // 紫色
            break;
          case 'similar_to':
            lineColor = '#ec4899'; // 粉色
            curveness = 0.4;
            break;
        }

        links.push({
          source: node.id,
          target: relation.targetId,
          lineStyle: {
            color: lineColor,
            width: lineWidth,
            type: lineType,
            curveness: curveness
          },
          label: {
            show: true,
            formatter: relation.label || relation.type.replace('_', ' '),
            fontSize: 10,
            color: lineColor
          },
          tooltip: {
            formatter: relation.label || relation.type.replace('_', ' ')
          }
        });
      });
    }
  };

  // 从根节点开始处理
  processNode(rootNode);

  return { nodes, links, categories };
};

export function EChartsKnowledgeGraph({ className }: EChartsKnowledgeGraphProps) {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(defaultRoadmapId);
  const [rootNode, setRootNode] = useState<MindMapNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: any[], links: any[], categories: any[] }>({ nodes: [], links: [], categories: [] });
  const chartRef = useRef<ReactECharts>(null);

  // 初始化路线图数据
  useEffect(() => {
    const roadmap = roadmapData[selectedRoadmapId as keyof typeof roadmapData];
    if (roadmap) {
      setRootNode(roadmap.rootNode);
      setSelectedNode(null);
      
      // 转换为ECharts数据格式
      const data = convertToEChartsData(roadmap.rootNode);
      setGraphData(data);
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

    const updatedRootNode = updateNodeComplete(rootNode);
    setRootNode(updatedRootNode);

    // 如果当前选中的节点被更新，也更新选中节点的状态
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, completed: !prev.completed } : null);
    }

    // 更新图表数据
    const data = convertToEChartsData(updatedRootNode);
    setGraphData(data);
  };

  // 查找节点
  const findNode = (nodeId: string, node: MindMapNode): MindMapNode | null => {
    if (node.id === nodeId) {
      return node;
    }

    if (node.children) {
      for (const child of node.children) {
        const found = findNode(nodeId, child);
        if (found) return found;
      }
    }

    return null;
  };

  // 图表配置
  const getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      legend: {
        data: graphData.categories.map(category => category.name),
        orient: 'vertical',
        right: 10,
        top: 20,
        textStyle: {
          color: '#888'
        }
      },
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        name: '知识图谱',
        type: 'graph',
        layout: 'force',
        data: graphData.nodes,
        links: graphData.links,
        categories: graphData.categories,
        roam: true,
        draggable: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        force: {
          repulsion: 200,
          gravity: 0.1,
          edgeLength: [80, 200],
          layoutAnimation: true
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4
          }
        }
      }]
    };
  };

  // 处理图表点击事件
  const handleChartEvents = {
    'click': (params: any) => {
      if (params.dataType === 'node' && rootNode) {
        const node = findNode(params.data.id, rootNode);
        if (node) {
          setSelectedNode(node);
        }
      }
    }
  };

  // 重置视图
  const resetView = () => {
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance();
      chart.dispatchAction({
        type: 'restore'
      });
    }
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

      {/* 知识图谱区域 */}
      <div className="relative border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/50 h-[600px]">
        <ReactECharts
          ref={chartRef}
          option={getOption()}
          style={{ height: '100%', width: '100%' }}
          onEvents={handleChartEvents}
          notMerge={true}
          lazyUpdate={true}
          theme={"dark"}
        />
      </div>

      {/* 节点详情面板 - 知识图谱节点详情 */}
      {selectedNode && (
        <Card className="p-5 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-lg border-t-4 overflow-hidden relative" 
          style={{ borderTopColor: selectedNode.style?.backgroundColor || (selectedNode.completed ? '#10b981' : '#374151') }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 -rotate-12 transform translate-x-8 -translate-y-8">
            {selectedNode.style?.iconName && getIconComponent(selectedNode.style.iconName)}
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                {selectedNode.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                {selectedNode.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedNode.description}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
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
                      onClick={() => setSelectedNode(child)}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                    >
                      {child.completed ? 
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : 
                        <Circle className="w-4 h-4 mr-2 text-gray-400" />
                      }
                      <span className="text-sm">{child.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 关联节点列表 - 知识图谱特有 */}
            {selectedNode.relations && selectedNode.relations.length > 0 && rootNode && (
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Network className="w-4 h-4 mr-1.5 text-blue-500" />
                  知识关联
                </h4>
                <div className="space-y-1.5">
                  {selectedNode.relations.map((relation, index) => {
                    const targetNode = findNode(relation.targetId, rootNode);
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
                        onClick={() => setSelectedNode(targetNode)}
                      >
                        <div className="flex items-center">
                          {targetNode.completed ? 
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : 
                            <Circle className="w-4 h-4 mr-2 text-gray-400" />
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

      {/* 图例说明 */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border shadow-sm">
        <h4 className="font-medium text-sm mb-3 flex items-center">
          <Network className="w-4 h-4 mr-1.5 text-blue-500" />
          知识图谱说明
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm shadow-green-500/30">
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
              <div className="w-10 h-1.5 bg-green-500 rounded-full shadow-sm shadow-green-500/30"></div>
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
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
              <Info className="w-3 h-3" />
            </div>
            <span>点击节点查看详情</span>
          </div>
        </div>
      </div>
    </div>
  );
}