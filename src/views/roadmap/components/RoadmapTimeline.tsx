import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface RoadmapNodeBase {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface SubNode extends RoadmapNodeBase {
  children?: RoadmapNodeBase[];
}

interface RoadmapNode extends RoadmapNodeBase {
  subNodes?: SubNode[];
}

interface RoadmapTimelineProps {
  className?: string;
  nodes?: RoadmapNode[];
  onNodeComplete?: (nodeId: string, completed: boolean) => void;
  onSubNodeComplete?: (nodeId: string, subNodeId: string, completed: boolean) => void;
}

// 添加一些示例详细节点数据到默认数据中
const defaultNodes: RoadmapNode[] = [
  {
    id: 'basics',
    title: 'Web 基础',
    description: 'HTML, CSS 和 JavaScript 基础知识',
    completed: false,
    subNodes: [
      {
        id: 'html',
        title: 'HTML',
        description: '网页结构的基础',
        completed: false,
        detailNodes: [
          {
            id: 'html-basics',
            title: 'HTML基础',
            description: '标签、属性和元素',
            completed: false,
          },
          {
            id: 'html-forms',
            title: 'HTML表单',
            description: '创建交互式表单',
            completed: false,
          },
          {
            id: 'html-semantics',
            title: '语义化HTML',
            description: '使用正确的标签表达内容含义',
            completed: false,
          },
        ],
      },
      {
        id: 'css',
        title: 'CSS',
        description: '网页样式的基础',
        completed: false,
        detailNodes: [
          {
            id: 'css-selectors',
            title: 'CSS选择器',
            description: '选择和样式化HTML元素',
            completed: false,
          },
          {
            id: 'css-layout',
            title: 'CSS布局',
            description: 'Flexbox和Grid布局',
            completed: false,
          },
          {
            id: 'css-animations',
            title: 'CSS动画',
            description: '创建过渡和动画效果',
            completed: false,
          },
        ],
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        description: '网页交互的基础',
        completed: false,
        detailNodes: [
          {
            id: 'js-basics',
            title: 'JS基础',
            description: '变量、函数和控制流',
            completed: false,
          },
          {
            id: 'js-dom',
            title: 'DOM操作',
            description: '与网页元素交互',
            completed: false,
          },
          {
            id: 'js-async',
            title: '异步JavaScript',
            description: 'Promise和async/await',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'frontend-frameworks',
    title: '前端框架',
    description: 'React, Vue 或 Angular',
    completed: false,
    subNodes: [
      {
        id: 'react',
        title: 'React',
        description: '组件化UI库',
        completed: false,
        detailNodes: [
          {
            id: 'react-components',
            title: 'React组件',
            description: '函数组件和类组件',
            completed: false,
          },
          {
            id: 'react-hooks',
            title: 'React Hooks',
            description: '状态和副作用管理',
            completed: false,
          },
          {
            id: 'react-router',
            title: 'React Router',
            description: '客户端路由管理',
            completed: false,
          },
        ],
      },
      {
        id: 'vue',
        title: 'Vue',
        description: '渐进式JavaScript框架',
        completed: false,
      },
      {
        id: 'angular',
        title: 'Angular',
        description: '完整的前端MVC框架',
        completed: false,
      },
    ],
  },
  {
    id: 'state-management',
    title: '状态管理',
    description: 'Redux, Vuex 或 Context API',
    completed: false,
    subNodes: [
      {
        id: 'redux',
        title: 'Redux',
        description: 'JavaScript应用的状态容器',
        completed: false,
      },
      {
        id: 'vuex',
        title: 'Vuex',
        description: 'Vue专用的状态管理模式',
        completed: false,
      },
      {
        id: 'context-api',
        title: 'Context API',
        description: 'React的上下文API',
        completed: false,
      },
    ],
  },
  {
    id: 'api-integration',
    title: 'API 集成',
    description: 'RESTful API 和 GraphQL',
    completed: false,
    subNodes: [
      {
        id: 'rest',
        title: 'RESTful API',
        description: '表现层状态转换架构风格',
        completed: false,
      },
      {
        id: 'graphql',
        title: 'GraphQL',
        description: 'API的查询语言',
        completed: false,
      },
    ],
  },
  {
    id: 'testing',
    title: '测试',
    description: '单元测试和集成测试',
    completed: false,
    subNodes: [
      {
        id: 'unit-testing',
        title: '单元测试',
        description: '测试独立单元的功能',
        completed: false,
      },
      {
        id: 'integration-testing',
        title: '集成测试',
        description: '测试多个单元的协同工作',
        completed: false,
      },
      {
        id: 'e2e-testing',
        title: '端到端测试',
        description: '测试整个应用流程',
        completed: false,
      },
    ],
  },
  {
    id: 'deployment',
    title: '部署',
    description: 'CI/CD 和云服务',
    completed: false,
    subNodes: [
      {
        id: 'ci-cd',
        title: 'CI/CD',
        description: '持续集成和持续部署',
        completed: false,
      },
      {
        id: 'cloud-services',
        title: '云服务',
        description: 'AWS, Azure, GCP等云平台',
        completed: false,
      },
    ],
  },
];

export function RoadmapTimeline({ 
  className, 
  nodes = defaultNodes,
  onNodeComplete,
  onSubNodeComplete 
}: RoadmapTimelineProps) {
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>(nodes);
  const [visibleNodes, setVisibleNodes] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedSubNode, setSelectedSubNode] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // 检查节点是否可以被完成（前面的节点都已完成）
  const canCompleteNode = (index: number): boolean => {
    // 第一个节点总是可以完成
    if (index === 0) return true;
    
    // 检查前面的所有节点是否都已完成
    for (let i = 0; i < index; i++) {
      if (!roadmapNodes[i].completed) {
        return false;
      }
    }
    
    return true;
  };

  // 切换节点完成状态
  const toggleNodeComplete = (id: string, index: number) => {
    // 如果节点不能被完成，则不执行任何操作
    if (!canCompleteNode(index) && !roadmapNodes[index].completed) {
      return;
    }
    
    const updatedNodes = roadmapNodes.map((node, idx) => {
      if (node.id === id) {
        const newCompleted = !node.completed;
        
        // 如果取消完成状态，则后续所有节点也必须取消完成状态
        if (!newCompleted && idx < roadmapNodes.length - 1) {
          const nodesToUpdate = [...roadmapNodes];
          for (let i = idx + 1; i < nodesToUpdate.length; i++) {
            nodesToUpdate[i] = { ...nodesToUpdate[i], completed: false };
          }
          setRoadmapNodes(nodesToUpdate);
          setVisibleNodes(idx + 1);
          
          // 调用外部回调
          if (onNodeComplete) {
            for (let i = idx; i < nodesToUpdate.length; i++) {
              onNodeComplete(nodesToUpdate[i].id, false);
            }
          }
          
          return { ...node, completed: newCompleted };
        }
        
        // 如果完成状态，则显示下一个节点
        if (newCompleted && index === visibleNodes - 1 && visibleNodes < roadmapNodes.length) {
          setVisibleNodes(visibleNodes + 1);
        }
        
        // 调用外部回调
        if (onNodeComplete) {
          onNodeComplete(id, newCompleted);
        }
        
        return { ...node, completed: newCompleted };
      }
      return node;
    });
    
    if (!updatedNodes.some(node => node.id === id && !node.completed)) {
      setRoadmapNodes(updatedNodes);
    }
  };
  
  // 切换子节点完成状态
  const toggleSubNodeComplete = (nodeId: string, subNodeId: string) => {
    const nodeIndex = roadmapNodes.findIndex(node => node.id === nodeId);
    if (nodeIndex === -1) return;
    
    const node = roadmapNodes[nodeIndex];
    if (!node.subNodes) return;
    
    const subNodeIndex = node.subNodes.findIndex(subNode => subNode.id === subNodeId);
    if (subNodeIndex === -1) return;
    
    const updatedNodes = [...roadmapNodes];
    const updatedSubNodes = [...node.subNodes];
    
    updatedSubNodes[subNodeIndex] = {
      ...updatedSubNodes[subNodeIndex],
      completed: !updatedSubNodes[subNodeIndex].completed
    };
    
    updatedNodes[nodeIndex] = {
      ...node,
      subNodes: updatedSubNodes
    };
    
    setRoadmapNodes(updatedNodes);
    
    if (onSubNodeComplete) {
      onSubNodeComplete(nodeId, subNodeId, updatedSubNodes[subNodeIndex].completed);
    }
  };
  
  // 选择节点，显示详细信息
  const selectNode = (id: string) => {
    setIsAnimating(true);
    
    // 如果点击的是当前选中的节点，则关闭详情
    if (selectedNode === id) {
      setSelectedNode(null);
      setSelectedSubNode(null);
    } else {
      setSelectedNode(id);
      setSelectedSubNode(null);
    }
    
    // 动画完成后重置状态
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };
  
  // 选择子节点，显示详细信息
  const selectSubNode = (id: string) => {
    setIsAnimating(true);
    
    // 如果点击的是当前选中的子节点，则关闭详情
    if (selectedSubNode === id) {
      setSelectedSubNode(null);
    } else {
      setSelectedSubNode(id);
    }
    
    // 动画完成后重置状态
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={cn('relative flex flex-col md:flex-row gap-6', className)}>
      <div className={cn(
        'relative transition-all duration-300 ease-in-out',
        selectedNode ? 'flex-1 md:flex-[0.6]' : 'flex-1'
      )}>
        {/* 垂直线 */}
        <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
        
        {/* 节点列表 */}
        <div className="space-y-4 relative z-10">
          {roadmapNodes.slice(0, visibleNodes).map((node, index) => {
            const isCompletable = canCompleteNode(index);
            const isCompleted = node.completed;
            const isSelected = selectedNode === node.id;
            
            return (
              <div key={node.id} className="flex items-start gap-3">
                {/* 节点图标 */}
                <button
                  onClick={() => toggleNodeComplete(node.id, index)}
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
                  onClick={() => isCompletable || isCompleted ? selectNode(node.id) : null}
                  className={cn(
                    'flex-1 p-3 rounded-lg border transition-all duration-200 cursor-pointer',
                    isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : '',
                    isCompleted ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900' :
                      isCompletable ? 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700' :
                      'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 opacity-70'
                  )}
                >
                  <h3 className={cn(
                    'font-medium text-sm mb-0.5',
                    isCompleted ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'
                  )}>
                    {node.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{node.description}</p>
                  
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
          
          {visibleNodes < roadmapNodes.length && (
            <div className="flex items-center justify-center mt-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>完成当前节点后解锁更多内容</span>
              </div>
            </div>
          )}
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
      
      {/* 子节点详情 */}
      {selectedNode && (
        <div className={cn(
          'border-l border-gray-200 dark:border-gray-800 pl-6 transition-all duration-300 ease-in-out',
          selectedSubNode ? 'flex-1 md:flex-[0.4]' : 'flex-1 md:flex-[0.4]',
          isAnimating ? 'opacity-50' : 'opacity-100'
        )}>
          <div className="sticky top-4">
            {roadmapNodes.map(node => {
              if (node.id !== selectedNode || !node.subNodes) return null;
              
              return (
                <div key={`detail-${node.id}`} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-base">{node.title}详细路线</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedNode(null)}
                      className="h-8 px-2 text-xs md:hidden"
                    >
                      关闭
                    </Button>
                  </div>
                  
                  <div className="space-y-3 relative">
                    {/* 子节点垂直线 */}
                    <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                    
                    {node.subNodes.map((subNode, subIndex) => (
                      <div key={subNode.id} className="flex items-start gap-3">
                        {/* 子节点图标 */}
                        <button
                          onClick={() => toggleSubNodeComplete(node.id, subNode.id)}
                          className={cn(
                            'relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200 flex-shrink-0 mt-1',
                            subNode.completed ? 'bg-green-100 border-green-500 text-green-500' : 
                              'bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-500 hover:border-gray-400 dark:hover:border-gray-600'
                          )}
                        >
                          {subNode.completed ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Circle className="w-3 h-3" />
                          )}
                        </button>
                        
                        {/* 子节点内容 */}
                        <div 
                          onClick={() => subNode.detailNodes && subNode.detailNodes.length > 0 ? selectSubNode(subNode.id) : null}
                          className={cn(
                            'flex-1 p-3 rounded-lg border transition-all duration-200',
                            selectedSubNode === subNode.id ? 'ring-2 ring-blue-500 dark:ring-blue-400' : '',
                            subNode.completed ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900' :
                              'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700',
                            subNode.detailNodes && subNode.detailNodes.length > 0 ? 'cursor-pointer' : ''
                          )}>
                          <h4 className={cn(
                            'font-medium text-sm mb-0.5',
                            subNode.completed ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'
                          )}>
                            {subNode.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{subNode.description}</p>
                          
                          {subNode.detailNodes && subNode.detailNodes.length > 0 && (
                            <div className="mt-1 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                              <span>点击查看详细路线</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* 详细节点内容 */}
                  {selectedSubNode && (
                    <div className={cn(
                      'mt-4 pl-6 space-y-3 relative transition-all duration-300 ease-in-out',
                      isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                    )}>
                      {/* 详细节点标题 */}
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">
                          {node.subNodes.find(sn => sn.id === selectedSubNode)?.title} 详细路线
                        </h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedSubNode(null)}
                          className="h-6 px-2 text-xs"
                        >
                          关闭
                        </Button>
                      </div>
                      
                      {/* 详细节点垂直线 */}
                      <div className="absolute left-3 top-8 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                      
                      {/* 详细节点列表 */}
                      {node.subNodes.find(sn => sn.id === selectedSubNode)?.detailNodes?.map((detailNode, detailIndex) => (
                        <div key={detailNode.id} className="flex items-start gap-3">
                          {/* 详细节点图标 */}
                          <div className={cn(
                            'relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200 flex-shrink-0 mt-1',
                            detailNode.completed ? 'bg-green-100 border-green-500 text-green-500' : 
                              'bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-500'
                          )}>
                            {detailNode.completed ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <Circle className="w-3 h-3" />
                            )}
                          </div>
                          
                          {/* 详细节点内容 */}
                          <div className={cn(
                            'flex-1 p-3 rounded-lg border transition-all duration-200',
                            detailNode.completed ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900' :
                              'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800'
                          )}>
                            <h5 className={cn(
                              'font-medium text-sm mb-0.5',
                              detailNode.completed ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'
                            )}>
                              {detailNode.title}
                            </h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{detailNode.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}