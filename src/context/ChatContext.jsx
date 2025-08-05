import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_CHAT':
      return {
        ...state,
        messages: [],
        error: null,
      };
    case 'ADD_BOT_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

const ChatContext = createContext(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    dispatch({ type: 'SEND_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      // Mock bot response - in real app, this would be an API call
      const botResponses = [
        "That's an interesting question! Let me think about that...",
        "I understand what you're asking. Here's what I can tell you...",
        "Great question! Based on my knowledge, I'd say...",
        "I'm here to help! Let me provide you with some information...",
        "Thanks for reaching out! Here's what I found...",
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      dispatch({ type: 'ADD_BOT_MESSAGE', payload: botMessage });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send message' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  const value = {
    messages: state.messages,
    sendMessage,
    isLoading: state.isLoading,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}; 