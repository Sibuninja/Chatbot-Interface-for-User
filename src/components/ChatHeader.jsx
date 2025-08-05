import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Trash2, Wifi } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const ChatHeader = () => {
  const { clearChat } = useChat();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Bot Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Assistant</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white/90">Online & Ready</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <Wifi size={16} />
            <span className="text-xs font-medium">Connected</span>
          </div>

          {/* Clear Chat Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearChat}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-full"
            title="Clear chat"
          >
            <Trash2 size={20} />
          </motion.button>
        </div>
      </div>

      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-sm text-white/90"
      >
        How can I help you today? I'm here to assist with any questions or tasks you might have.
      </motion.div>
    </motion.div>
  );
};

export default ChatHeader; 