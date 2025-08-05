import React from 'react';
import { motion } from 'framer-motion';
import { ChatProvider } from './context/ChatContext';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';

const App = () => {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-5xl mx-auto h-screen flex flex-col">
          {/* Main Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Header */}
            <ChatHeader />
            
            {/* Chat Messages */}
            <ChatContainer />
            
            {/* Message Input */}
            <MessageInput />
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-500 text-sm py-4"
          >
            <p>Powered by AI • Built with React & TypeScript</p>
          </motion.div>
        </div>
      </div>
    </ChatProvider>
  );
};

export default App; 