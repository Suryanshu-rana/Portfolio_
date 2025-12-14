import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am Suryanshu\'s AI assistant. Ask me anything about his skills or projects!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await sendMessageToGemini(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error.", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      <div 
        className={`bg-android-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden mb-4 w-80 md:w-96 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 h-0'}`}
      >
        {/* Header */}
        <div className="bg-android p-4 flex justify-between items-center text-black">
          <div className="flex items-center space-x-2">
            <i className="fas fa-robot text-lg"></i>
            <span className="font-bold">Portfolio AI Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-android-bg">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-android text-black rounded-tr-none' 
                    : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-3 rounded-lg rounded-tl-none border border-white/5">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-android-surface border-t border-white/5 flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about my skills..."
            className="flex-1 bg-android-bg text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-android border border-white/10"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-android text-black p-2 rounded-lg hover:bg-android-dark transition-colors disabled:opacity-50"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-14 h-14 bg-android hover:bg-white text-black rounded-full shadow-lg shadow-android/20 transition-all duration-300 flex items-center justify-center"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-alt'} text-xl transition-transform duration-300 group-hover:scale-110`}></i>
        {!isOpen && (
            <span className="absolute right-full mr-3 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Ask AI about me
            </span>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;