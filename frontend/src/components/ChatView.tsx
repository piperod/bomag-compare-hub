import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatView = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': 'bomag-secure-key-2024' // In production, use environment variable
        },
        body: JSON.stringify({ message: input })
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please check your API key.');
        }
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full">
      <Card className="h-[70vh] flex flex-col shadow-lg border">
        <CardHeader className="bg-gradient-to-r from-bomag-yellow to-bomag-yellow/90 text-bomag-gray border-b-0">
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-bomag-gray/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-4 h-4 text-bomag-gray" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">BOMAG AI Assistant</h2>
              <p className="text-xs text-bomag-gray/80 font-normal">Ask me anything about BOMAG machines</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <div className="w-12 h-12 bg-bomag-yellow/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bot className="w-6 h-6 text-bomag-yellow" />
                </div>
                <h3 className="text-base font-semibold text-gray-700 mb-2">Welcome to BOMAG AI Assistant</h3>
                <p className="text-gray-600 mb-3 text-sm">I can help you with:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-lg mx-auto">
                  <div className="bg-white p-2 rounded-lg border border-gray-200">
                    <p className="text-xs font-medium text-gray-700">Machine Specifications</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-200">
                    <p className="text-xs font-medium text-gray-700">Maintenance Tips</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-200">
                    <p className="text-xs font-medium text-gray-700">Technical Support</p>
                  </div>
                </div>
              </div>
            )}
            
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-bomag-yellow text-bomag-gray' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`px-3 py-2 rounded-xl shadow-sm ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-bomag-yellow to-bomag-yellow/90 text-bomag-gray rounded-br-md' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                  }`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-bomag-gray/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-gray-600" />
                  </div>
                  <div className="bg-white text-gray-800 px-3 py-2 rounded-xl border border-gray-200 rounded-bl-md shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-bomag-yellow rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-bomag-yellow rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-bomag-yellow rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about BOMAG machines..."
                  disabled={isLoading}
                  className="pr-10 py-2 border-gray-300 focus:border-bomag-yellow focus:ring-bomag-yellow/20 rounded-lg text-sm"
                />
              </div>
              <Button 
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-bomag-yellow hover:bg-bomag-yellow/90 text-bomag-gray px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                size="sm"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
