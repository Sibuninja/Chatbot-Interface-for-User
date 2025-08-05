import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Trash2, Wifi, WifiOff } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const ChatHeader: React.FC = () => {
  const { clearChat } = useChat();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Bot Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Connection Status */}
          <div className="flex items-center gap-1 text-green-500">
            <Wifi size={16} />
            <span className="text-xs">Connected</span>
          </div>

          {/* Clear Chat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearChat}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
            title="Clear chat"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>

      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-sm text-gray-600"
      >
        How can I help you today? I'm here to assist with any questions you might have.
      </motion.div>
    </motion.div>
  );
};

export default ChatHeader; 