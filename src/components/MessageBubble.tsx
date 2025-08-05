import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../types/chat';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLast }) => {
  const isUser = message.sender === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-primary-500 text-white' 
            : 'bg-gray-200 text-gray-600'
        }`}>
          {isUser ? (
            <User size={16} />
          ) : (
            <Bot size={16} />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className={`px-4 py-3 rounded-2xl shadow-sm max-w-full ${
              isUser
                ? 'bg-primary-500 text-white rounded-br-md'
                : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </motion.div>
          
          {/* Timestamp */}
          <span className={`text-xs text-gray-500 mt-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble; 