import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

const MessageBubble = ({ message, isLast }) => {
  const isUser = message.sender === 'user';
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex items-start gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 border border-gray-200'
        }`}>
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className={`px-5 py-3 rounded-2xl shadow-sm max-w-full ${
              isUser
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                : 'bg-white text-gray-800 rounded-bl-md border border-gray-100 shadow-md'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </motion.div>
          
          {/* Timestamp */}
          <span className={`text-xs text-gray-500 mt-2 ${
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