import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';
import { toast } from '@/registry/hooks/use-toast';
import { cn } from '@/lib/utils';

// 懒加载Markdown相关组件
const ReactMarkdown = lazy(() => import('react-markdown'));
// 直接导入rehype插件，而不是懒加载它们
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

// 导入Ant Design X组件
import {
  XProvider,
  Bubble,
  Sender,
  Conversations,
  XStream,
  XRequest,
  useXChat
} from '@ant-design/x';

// 导入HeroUI的ScrollShadow组件
import { ScrollShadow } from '@heroui/scroll-shadow';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// 创建一个增强版的聊天页面组件
export default function EnhancedChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [openai, setOpenai] = useState<any>(null);
  const [streamingMessage, setStreamingMessage] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>(''); // 添加输入值状态
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 懒加载OpenAI库
  useEffect(() => {
    const loadOpenAI = async () => {
      try {
        const { OpenAI } = await import('openai');
        setOpenai(new OpenAI({
          apiKey: 'sk-719bb9860c804c97ae0cc8c477aafcbe', // 通义千问 API密钥
          baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1', // 通义千问API的OpenAI兼容模式地址
          dangerouslyAllowBrowser: true, // 允许在浏览器中使用API密钥
        }));
      } catch (error) {
        console.error('Failed to load OpenAI:', error);
        toast({
          title: "错误",
          description: '加载AI服务失败，请刷新页面重试',
          variant: "destructive"
        });
      }
    };
    
    loadOpenAI();
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  // 转换消息格式以适配Ant Design X组件
  const convertedMessages = messages.map(msg => ({
    id: msg.id,
    content: msg.content,
    role: msg.role,
    timestamp: msg.timestamp,
  }));

  // 发送消息到通义千问API并处理流式响应
  const sendMessageToAPI = async (userMessage: string) => {
    try {
      setLoading(true);
      
      // 添加用户消息到列表
      const newUserMessage = {
        id: Date.now().toString(),
        content: userMessage,
        role: 'user' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      
      // 清空输入框
      setInputValue('');
      
      // 重置流式消息
      setStreamingMessage('');
      
      // 准备历史消息
      const historyMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // 调用通义千问 API (流式响应)
      const response = await openai.chat.completions.create({
        model: 'qwen-plus', // 使用通义千问-plus模型
        messages: [
          ...historyMessages,
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        stream: true, // 启用流式响应
      });

      let fullResponse = '';
      
      // 使用XStream处理流式响应
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          setStreamingMessage(fullResponse);
        }
      }
      
      // 流式响应完成后，添加完整的AI回复到消息列表
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-ai',
          content: fullResponse,
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
      
      // 清空流式消息状态
      setStreamingMessage('');
      
    } catch (error) {
      console.error('Error calling 通义千问 API:', error);
      toast({
        title: "错误",
        description: '与AI对话时出现错误，请稍后再试',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 处理发送消息
  const handleSendMessage = (value: string) => {
    if (!value.trim()) return;
    sendMessageToAPI(value);
  };

  // 处理输入变化
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // 自定义渲染消息内容的函数
  const renderMessageContent = (content: string, role: 'user' | 'assistant') => {
    if (role === 'user') {
      return <div className="whitespace-pre-wrap">{content}</div>;
    } else {
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <Suspense fallback={<div className="p-2 text-muted-foreground">加载中...</div>}>
            <ReactMarkdown 
              rehypePlugins={[() => rehypeRaw(), () => rehypeSanitize()]}
            >
              {content}
            </ReactMarkdown>
          </Suspense>
        </div>
      );
    }
  };

  return (
    <div className="chat-container flex flex-col h-[calc(100vh-4rem)] relative">
      <div className="main-section w-full flex-grow overflow-hidden">
        <Card className="chat-card w-full h-full border-0 shadow-lg bg-background dark:bg-background backdrop-blur-sm flex flex-col">
          <XProvider theme={{}}>
            <div className="flex flex-col h-full">
              <ScrollShadow className="messages-container flex-grow p-4 pb-20 dark:text-gray-200" hideScrollBar size={100}>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground dark:text-gray-300">
                    <Bot className="h-16 w-16 mb-4 text-primary opacity-80" />
                    <p className="text-center">开始与 Devsphere  AI 助手对话吧！</p>
                    <p className="text-center text-sm mt-2 max-w-md">您可以询问任何问题，AI助手将尽力为您提供帮助。</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={cn(
                          "flex animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
                          msg.role === 'user' ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className={cn(
                          "flex items-start gap-2 max-w-[80%]",
                          msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}>
                          <div className="flex-shrink-0">
                            {msg.role === 'user' ? (
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <User className="h-5 w-5 text-primary-foreground" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center dark:bg-gray-700">
                                <Bot className="h-5 w-5 text-foreground dark:text-gray-200" />
                              </div>
                            )}
                          </div>
                          <div
                            className={cn(
                              "p-4 rounded-lg shadow-sm",
                              msg.role === 'user' 
                                ? "bg-primary text-primary-foreground rounded-tr-none" 
                                : "bg-muted dark:bg-gray-700 text-foreground dark:text-gray-200 rounded-tl-none"
                            )}
                          >
                            {renderMessageContent(msg.content, msg.role)}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* 流式响应显示 */}
                    {streamingMessage && (
                      <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted dark:bg-gray-700 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-foreground dark:text-gray-200" />
                          </div>
                          <div
                            className="p-4 rounded-lg shadow-sm bg-muted dark:bg-gray-700 text-foreground dark:text-gray-200 rounded-tl-none max-w-[80%]"
                          >
                            {renderMessageContent(streamingMessage, 'assistant')}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollShadow>
              
              {/* 浮动的消息发送框 */}
              <div className="fixed bottom-10 left-0 right-0 p-4 text-white z-10">
                <div className="max-w-4xl mx-auto">
                  <Sender
                    onSubmit={handleSendMessage}
                    onChange={handleInputChange}
                    value={inputValue}
                    loading={loading}
                    disabled={loading}
                    placeholder="输入你的问题..."
                    className="flex-grow min-h-[60px] max-h-[120px] resize-none border-primary/20 focus-visible:ring-primary/30 !text-white [&_*]:!text-white placeholder:!text-white/70"
                    style={{ color: 'white' }}
                  />
                </div>
              </div>
            </div>
          </XProvider>
        </Card>
      </div>
    </div>
  );
}
