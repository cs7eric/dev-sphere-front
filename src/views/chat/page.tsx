import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Loader2, Send, User, Bot } from 'lucide-react';
import { toast } from '@/registry/hooks/use-toast';

// 懒加载Markdown相关组件
const ReactMarkdown = lazy(() => import('react-markdown'));
const rehypeRaw = lazy(() => import('rehype-raw'));
const rehypeSanitize = lazy(() => import('rehype-sanitize'));

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 使用懒加载方式创建OpenAI客户端实例
  const [openai, setOpenai] = useState<any>(null);
  
  // 懒加载OpenAI库
  useEffect(() => {
    const loadOpenAI = async () => {
      try {
        const { OpenAI } = await import('openai');
        setOpenai(new OpenAI({
          apiKey: 'sk-719bb9860c804c97ae0cc8c477aafcbe', // 这里需要填入通义千问 API密钥
          baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1', // 通义千问API的OpenAI兼容模式地址
          dangerouslyAllowBrowser: true, // 允许在浏览器中使用API密钥（注意：这存在安全风险，生产环境应使用后端API中转请求）
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
  
  // AI思考过程状态
  const [thinking, setThinking] = useState('');
  const [thinkingDots, setThinkingDots] = useState('');

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 模拟AI思考过程的效果
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      // 模拟思考过程的文本
      const thinkingTexts = [
        '正在分析您的问题...',
        '搜索相关知识库...',
        '组织回答内容...',
        '优化表达方式...',
        '准备回复中...',
      ];
      
      let currentTextIndex = 0;
      setThinking(thinkingTexts[0]);
      
      // 每3秒切换一次思考文本
      interval = setInterval(() => {
        currentTextIndex = (currentTextIndex + 1) % thinkingTexts.length;
        setThinking(thinkingTexts[currentTextIndex]);
      }, 3000);
      
      // 动态显示省略号
      let dots = '';
      const dotsInterval = setInterval(() => {
        dots = dots.length >= 3 ? '' : dots + '.';
        setThinkingDots(dots);
      }, 500);
      
      return () => {
        clearInterval(interval);
        clearInterval(dotsInterval);
      };
    }
  }, [loading]);

  // 发送消息到DeepSeek API
  const sendMessageToDeepSeek = async (userMessage: string) => {
    try {
      setLoading(true);
      
      // 调用通义千问 API
      const response = await openai.chat.completions.create({
        model: 'qwen-plus', // 使用通义千问-plus模型
        messages: [
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
      });

      // 获取AI回复
      const aiResponse = response.choices[0]?.message?.content || '抱歉，我无法回答这个问题。';
      
      // 添加AI回复到消息列表
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-ai',
          content: aiResponse,
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error calling 通义千问 API:', error);
      toast({
        title: "错误",
        description: '与AI对话时出现错误，请稍后再试',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setThinking('');
      setThinkingDots('');
    }
  };

  // 处理发送消息
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // 添加用户消息到列表
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // 发送到DeepSeek API
    sendMessageToDeepSeek(inputValue);
  };

  // 处理按键事件
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container flex flex-col justify-center p-4 md:p-8">
      <div className="main-section w-full flex items-center justify-center">
        <Card className="chat-card w-full max-w-4xl border-0 shadow-lg dark:bg-gray-900/50 backdrop-blur-sm">
          <CardHeader className="border-b dark:border-gray-800">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span>通义千问 AI 助手</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="messages-container h-[60vh] overflow-y-auto p-4 mb-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Bot className="h-16 w-16 mb-4 text-primary opacity-80" />
                  <p className="text-center">开始与 通义千问 AI 助手对话吧！</p>
                  <p className="text-center text-sm mt-2 max-w-md">您可以询问任何问题，AI助手将尽力为您提供帮助。</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={cn(
                      "message flex mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "message-content max-w-[80%] p-4 rounded-lg shadow-sm",
                        msg.role === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-card dark:bg-gray-800 rounded-tl-none border dark:border-gray-700"
                      )}
                    >
                      <div className="message-header flex items-center gap-2 mb-2">
                        <Avatar className={cn(
                          "h-6 w-6",
                          msg.role === 'user' ? "bg-primary-foreground" : "bg-primary"
                        )}>
                          {msg.role === 'user' ? (
                            <User className="h-4 w-4 text-primary" />
                          ) : (
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          )}
                          <AvatarFallback>
                            {msg.role === 'user' ? 'U' : 'AI'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">
                          {msg.role === 'user' ? '你' : '通义千问 AI'}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="message-body text-sm leading-relaxed markdown-content">
                        {msg.role === 'user' ? (
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <Suspense fallback={<div className="p-2 text-muted-foreground">加载中...</div>}>
                              <ReactMarkdown 
                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                              >
                                {msg.content}
                              </ReactMarkdown>
                            </Suspense>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                  <div className="message-content max-w-[80%] p-4 rounded-lg shadow-sm bg-card dark:bg-gray-800 rounded-tl-none border dark:border-gray-700">
                    <div className="message-header flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6 bg-primary">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">通义千问 AI</span>
                      <div className="flex items-center ml-auto">
                        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                    <div className="message-body whitespace-pre-wrap text-sm leading-relaxed flex items-center gap-2">
                      <span>{thinking}</span>
                      <span className="text-primary font-medium">{thinkingDots}</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="input-container flex p-4 pt-0 gap-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="输入你的问题..." 
                className="flex-grow min-h-[60px] max-h-[120px] resize-none bg-background/50 border-primary/20 focus-visible:ring-primary/30"
              />
              <Button 
                variant="default" 
                size="icon"
                onClick={handleSendMessage} 
                disabled={loading || !inputValue.trim()}
                className="self-end h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}