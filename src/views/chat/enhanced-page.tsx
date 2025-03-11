import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { toast } from '@/registry/hooks/use-toast';
import { cn } from '@/lib/utils';

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

  // 转换消息格式以适配Ant Design X组件
  const convertedMessages = messages.map(msg => ({
    id: msg.id,
    content: msg.content,
    role: msg.role,
    timestamp: msg.timestamp,
  }));

  // 发送消息到通义千问API
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
    }
  };

  // 处理发送消息
  const handleSendMessage = (value: string) => {
    if (!value.trim()) return;
    sendMessageToAPI(value);
  };

  return (
    <div className="chat-container flex flex-col justify-center p-4 md:p-8">
      <div className="main-section w-full flex items-center justify-center">
        <Card className="chat-card w-full max-w-4xl border-0 shadow-lg bg-white backdrop-blur-sm">
          <CardHeader className="border-b dark:border-gray-800">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span>通义千问 AI 助手</span>
            </CardTitle>
          </CardHeader>
          
          {/* 使用Ant Design X的XProvider包装聊天组件 */}
          <XProvider
            theme={{
            }}
          >
            <div className="messages-container h-[60vh] overflow-y-auto p-4 mb-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Bot className="h-16 w-16 mb-4 text-primary opacity-80" />
                  <p className="text-center">开始与 通义千问 AI 助手对话吧！</p>
                  <p className="text-center text-sm mt-2 max-w-md">您可以询问任何问题，AI助手将尽力为您提供帮助。</p>
                </div>
              ) : (
                <Bubble.List
                  items={convertedMessages}
                  renderItem={(item) => (
                    <Bubble
                      key={item.id}
                      type={item.role === 'user' ? 'primary' : 'secondary'}
                      content={item.content}
                      className={cn(
                        "message flex mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
                        item.role === 'user' 
                          ? "justify-end dark:text-white text-primary-foreground" 
                          : "justify-start text-white dark:text-white font-medium"
                      )}
                    />
                  )}
                />
              )}
              {loading && (
                <div className="flex justify-start mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                  <div className="message-content max-w-[80%] p-4 rounded-lg shadow-sm bg-card dark:bg-gray-800 rounded-tl-none border dark:border-gray-700">
                    <div className="message-header flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium">通义千问 AI 正在思考...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 使用Ant Design X的Sender组件 */}
            <div className="p-4 pt-0">
              <Sender
                onSubmit={handleSendMessage}
                loading={loading}
                disabled={loading}
                placeholder="输入你的问题..."
                className="flex-grow min-h-[60px] max-h-[120px] resize-none bg-background/50 border-primary/20 focus-visible:ring-primary/30"
              />
            </div>
          </XProvider>
        </Card>
      </div>
    </div>
  );
}