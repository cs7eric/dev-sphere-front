// 知识图谱节点接口
interface MindMapNode {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  // 节点位置信息，用于知识图谱布局
  position?: { x: number; y: number };
  // 节点样式信息
  style?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    iconName?: string;
  };
  // 节点详细信息
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
  // 关联节点
  children?: MindMapNode[];
  // 节点关系定义 - 知识图谱特有
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

// 前端开发路线图数据
const frontendRoadmap: MindMapData = {
  id: 'frontend',
  title: '前端开发知识图谱',
  description: '前端开发技术的知识关联网络',
  rootNode: {
    id: 'frontend-root',
    title: '前端开发',
    description: '构建用户界面和交互体验',
    completed: false,
    style: {
      backgroundColor: '#4338ca',
      borderColor: '#3730a3',
      textColor: '#ffffff',
      iconName: 'Code'
    },
    children: [
      {
        id: 'html-css',
        title: 'HTML & CSS',
        description: '网页结构和样式基础',
        completed: false,
        style: {
          backgroundColor: '#0ea5e9',
          borderColor: '#0284c7',
          iconName: 'FileCode'
        },
        details: {
          difficulty: 'beginner',
          estimatedHours: 40,
          resources: [
            {
              title: 'MDN Web Docs - HTML',
              url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML',
              type: 'documentation'
            },
            {
              title: 'MDN Web Docs - CSS',
              url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS',
              type: 'documentation'
            }
          ],
          skills: ['语义化HTML', '响应式设计', 'Flexbox', 'Grid布局']
        },
        relations: [
          {
            targetId: 'javascript',
            type: 'related',
            label: '被JS操作',
            strength: 0.8
          },
          {
            targetId: 'frontend-frameworks',
            type: 'leads_to',
            label: '框架基础',
            strength: 0.7
          }
        ],
        children: [
          {
            id: 'html-basics',
            title: 'HTML基础',
            description: '标签、属性和元素',
            completed: false,
            details: {
              difficulty: 'beginner',
              estimatedHours: 15,
              resources: [
                {
                  title: 'HTML入门教程',
                  url: 'https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML',
                  type: 'article'
                }
              ]
            }
          },
          {
            id: 'css-basics',
            title: 'CSS基础',
            description: '选择器、盒模型和布局',
            completed: false,
            details: {
              difficulty: 'beginner',
              estimatedHours: 20,
              resources: [
                {
                  title: 'CSS入门教程',
                  url: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps',
                  type: 'article'
                }
              ]
            }
          },
          {
            id: 'responsive-design',
            title: '响应式设计',
            description: '媒体查询和移动优先',
            completed: false,
            details: {
              difficulty: 'intermediate',
              estimatedHours: 15
            }
          }
        ]
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        description: '网页交互和编程基础',
        completed: false,
        style: {
          backgroundColor: '#eab308',
          borderColor: '#ca8a04',
          iconName: 'FileJs'
        },
        details: {
          difficulty: 'intermediate',
          estimatedHours: 60,
          resources: [
            {
              title: 'JavaScript - MDN',
              url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
              type: 'documentation'
            }
          ]
        },
        relations: [
          {
            targetId: 'html-css',
            type: 'related',
            label: '操作HTML/CSS',
            strength: 0.8
          },
          {
            targetId: 'frontend-frameworks',
            type: 'leads_to',
            label: '进阶学习',
            strength: 0.9
          },
          {
            targetId: 'build-tools',
            type: 'related',
            label: '配合使用',
            strength: 0.7
          }
        ],
        children: [
          {
            id: 'js-basics',
            title: 'JS基础',
            description: '语法、变量和数据类型',
            completed: false
          },
          {
            id: 'dom-manipulation',
            title: 'DOM操作',
            description: '选择和修改页面元素',
            completed: false
          },
          {
            id: 'async-js',
            title: '异步JavaScript',
            description: 'Promise、async/await',
            completed: false,
            details: {
              difficulty: 'advanced',
              estimatedHours: 20
            }
          },
          {
            id: 'es6-plus',
            title: 'ES6+特性',
            description: '现代JavaScript语法',
            completed: false
          }
        ]
      },
      {
        id: 'frontend-frameworks',
        title: '前端框架',
        description: '组件化开发和状态管理',
        completed: false,
        style: {
          backgroundColor: '#16a34a',
          borderColor: '#15803d',
          iconName: 'Layers'
        },
        relations: [
          {
            targetId: 'javascript',
            type: 'prerequisite',
            label: '基于JavaScript',
            strength: 0.9
          },
          {
            targetId: 'build-tools',
            type: 'related',
            label: '构建与部署',
            strength: 0.8
          }
        ],
        children: [
          {
            id: 'react',
            title: 'React',
            description: '组件化UI库',
            completed: false,
            style: {
              backgroundColor: '#0ea5e9',
              borderColor: '#0284c7'
            },
            children: [
              {
                id: 'react-hooks',
                title: 'React Hooks',
                description: '函数组件中的状态管理',
                completed: false
              },
              {
                id: 'react-router',
                title: 'React Router',
                description: '客户端路由管理',
                completed: false
              },
              {
                id: 'state-management',
                title: '状态管理',
                description: 'Redux、Context API',
                completed: false
              }
            ]
          },
          {
            id: 'vue',
            title: 'Vue',
            description: '渐进式JavaScript框架',
            completed: false,
            style: {
              backgroundColor: '#10b981',
              borderColor: '#059669'
            },
            children: [
              {
                id: 'vue-composition-api',
                title: '组合式API',
                description: 'Vue 3的新特性',
                completed: false
              },
              {
                id: 'vue-router',
                title: 'Vue Router',
                description: 'Vue的官方路由',
                completed: false
              },
              {
                id: 'vuex-pinia',
                title: 'Vuex/Pinia',
                description: 'Vue的状态管理',
                completed: false
              }
            ]
          }
        ]
      },
      {
        id: 'build-tools',
        title: '构建工具',
        description: '打包和开发工具',
        completed: false,
        style: {
          backgroundColor: '#f97316',
          borderColor: '#ea580c',
          iconName: 'Package'
        },
        relations: [
          {
            targetId: 'javascript',
            type: 'related',
            label: '处理JavaScript',
            strength: 0.7
          },
          {
            targetId: 'frontend-frameworks',
            type: 'includes',
            label: '支持框架',
            strength: 0.8
          }
        ],
        children: [
          {
            id: 'webpack',
            title: 'Webpack',
            description: '模块打包工具',
            completed: false
          },
          {
            id: 'vite',
            title: 'Vite',
            description: '下一代前端构建工具',
            completed: false
          },
          {
            id: 'babel',
            title: 'Babel',
            description: 'JavaScript编译器',
            completed: false
          }
        ]
      }
    ]
  }
};

// 后端开发路线图数据
const backendRoadmap: MindMapData = {
  id: 'backend',
  title: '后端开发路线图',
  description: '服务器端应用程序开发学习路径',
  rootNode: {
    id: 'backend-root',
    title: '后端开发',
    description: '构建服务器端应用和API',
    completed: false,
    style: {
      backgroundColor: '#7c3aed',
      borderColor: '#6d28d9',
      textColor: '#ffffff',
      iconName: 'Server'
    },
    children: [
      {
        id: 'programming-basics',
        title: '编程基础',
        description: '语言基础和计算机科学',
        completed: false,
        style: {
          backgroundColor: '#0ea5e9',
          borderColor: '#0284c7'
        },
        children: [
          {
            id: 'java',
            title: 'Java',
            description: '面向对象编程语言',
            completed: false
          },
          {
            id: 'python',
            title: 'Python',
            description: '通用脚本语言',
            completed: false
          },
          {
            id: 'nodejs',
            title: 'Node.js',
            description: '基于JavaScript的运行时',
            completed: false
          }
        ]
      },
      {
        id: 'databases',
        title: '数据库',
        description: '数据存储和查询',
        completed: false,
        style: {
          backgroundColor: '#ec4899',
          borderColor: '#db2777'
        },
        children: [
          {
            id: 'sql',
            title: 'SQL数据库',
            description: 'MySQL, PostgreSQL',
            completed: false
          },
          {
            id: 'nosql',
            title: 'NoSQL数据库',
            description: 'MongoDB, Redis',
            completed: false
          }
        ]
      },
      {
        id: 'apis',
        title: 'API开发',
        description: '接口设计和实现',
        completed: false,
        style: {
          backgroundColor: '#f97316',
          borderColor: '#ea580c'
        },
        children: [
          {
            id: 'rest-api',
            title: 'REST API',
            description: '表现层状态转移',
            completed: false
          },
          {
            id: 'graphql',
            title: 'GraphQL',
            description: '查询语言和运行时',
            completed: false
          }
        ]
      },
      {
        id: 'devops',
        title: 'DevOps',
        description: '开发和运维',
        completed: false,
        style: {
          backgroundColor: '#06b6d4',
          borderColor: '#0891b2'
        },
        children: [
          {
            id: 'docker',
            title: 'Docker',
            description: '容器化技术',
            completed: false
          },
          {
            id: 'ci-cd',
            title: 'CI/CD',
            description: '持续集成和部署',
            completed: false
          }
        ]
      }
    ]
  }
};

// 移动开发路线图数据
const mobileRoadmap: MindMapData = {
  id: 'mobile',
  title: '移动开发路线图',
  description: '移动应用程序开发学习路径',
  rootNode: {
    id: 'mobile-root',
    title: '移动开发',
    description: '构建移动应用程序',
    completed: false,
    style: {
      backgroundColor: '#f43f5e',
      borderColor: '#e11d48',
      textColor: '#ffffff',
      iconName: 'Smartphone'
    },
    children: [
      {
        id: 'react-native',
        title: 'React Native',
        description: '使用React构建原生应用',
        completed: false,
        style: {
          backgroundColor: '#0ea5e9',
          borderColor: '#0284c7'
        }
      },
      {
        id: 'flutter',
        title: 'Flutter',
        description: 'Google的UI工具包',
        completed: false,
        style: {
          backgroundColor: '#06b6d4',
          borderColor: '#0891b2'
        }
      },
      {
        id: 'native-development',
        title: '原生开发',
        description: '平台特定开发',
        completed: false,
        style: {
          backgroundColor: '#8b5cf6',
          borderColor: '#7c3aed'
        },
        children: [
          {
            id: 'android',
            title: 'Android开发',
            description: '使用Kotlin/Java',
            completed: false
          },
          {
            id: 'ios',
            title: 'iOS开发',
            description: '使用Swift/Objective-C',
            completed: false
          }
        ]
      }
    ]
  }
};

// 导出所有路线图数据
export const roadmapData = {
  frontend: frontendRoadmap,
  backend: backendRoadmap,
  mobile: mobileRoadmap
};

// 导出当前选中的路线图ID（默认为前端）
export const defaultRoadmapId = 'frontend';