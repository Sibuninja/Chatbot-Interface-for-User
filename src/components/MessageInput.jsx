import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Smile } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const { sendMessage, isLoading } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      const trimmedMessage = message.trim();
      setMessage('');
      await sendMessage(trimmedMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t border-gray-200 bg-white px-6 py-4"
    >
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Attachment and Emoji buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 rounded-full"
          >
            <Paperclip size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 rounded-full"
          >
            <Smile size={20} />
          </motion.button>
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full resize-none border border-gray-200 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 max-h-32 bg-gray-50 focus:bg-white"
            rows={1}
            disabled={isLoading}
          />
        </div>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`p-3 rounded-full transition-all duration-200 ${
            message.trim() && !isLoading
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send size={20} />
        </motion.button>
      </form>

      {/* Typing indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-500 mt-2 ml-4"
        >
          Press Enter to send, Shift+Enter for new line
        </motion.div>
      )}
    </motion.div>
  );
};

export default MessageInput; 