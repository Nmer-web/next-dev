import { useState, useEffect, useCallback } from 'react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'suggestion' | 'action';
  metadata?: {
    intent?: string;
    confidence?: number;
    suggestedActions?: string[];
  };
}

interface ChatbotContext {
  userIndustry?: string;
  userIntent?: string;
  previousMessages: ChatMessage[];
  userPreferences?: {
    language: string;
    timezone: string;
  };
}

const defaultSuggestions = [
  "Tell me about your services",
  "How can you help my business?",
  "What's your pricing?",
  "Show me your portfolio"
];

const processUserMessage = async (message: string, context: ChatbotContext): Promise<ChatMessage> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simple intent detection
  const lowerMessage = message.toLowerCase();
  let response: ChatMessage = {
    id: Date.now().toString(),
    content: "I'm not sure I understand. Could you please rephrase that?",
    sender: 'bot',
    timestamp: new Date(),
    type: 'text',
    metadata: {
      confidence: 0.5,
      suggestedActions: defaultSuggestions
    }
  };

  // Basic intent matching
  if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
    response = {
      id: Date.now().toString(),
      content: "I offer web design, AI automation, and custom development services. Would you like to know more about any specific service?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      metadata: {
        intent: 'service_inquiry',
        confidence: 0.9,
        suggestedActions: [
          "Tell me about web design",
          "What's AI automation?",
          "Explain custom development",
          "How much do you charge?"
        ]
      }
    };
  } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('charge')) {
    response = {
      id: Date.now().toString(),
      content: "My pricing varies based on project requirements. I offer both fixed-price and hourly rates. Would you like to schedule a consultation to discuss your specific needs?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      metadata: {
        intent: 'pricing_inquiry',
        confidence: 0.85,
        suggestedActions: [
          "Schedule a consultation",
          "Tell me about your process",
          "Show me your portfolio",
          "What's included in your services?"
        ]
      }
    };
  } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('project')) {
    response = {
      id: Date.now().toString(),
      content: "I'd be happy to show you my portfolio! You can view my recent projects in the portfolio section. Would you like me to highlight any specific type of project?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      metadata: {
        intent: 'portfolio_inquiry',
        confidence: 0.9,
        suggestedActions: [
          "Show e-commerce projects",
          "Show healthcare projects",
          "Show AI automation projects",
          "Schedule a call"
        ]
      }
    };
  }

  // Add industry-specific context if available
  if (context.userIndustry) {
    response.content += `\n\nI notice you're in the ${context.userIndustry} industry. I have specific experience in this sector and can tailor my services to your needs.`;
  }

  return response;
};

export const useAIChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ChatbotContext>({
    previousMessages: [],
    userPreferences: {
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  });

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const botResponse = await processUserMessage(content, context);
      setMessages(prev => [...prev, botResponse]);
      setContext(prev => ({
        ...prev,
        previousMessages: [...prev.previousMessages, userMessage, botResponse]
      }));
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsTyping(false);
    }
  }, [context]);

  const updateContext = useCallback((newContext: Partial<ChatbotContext>) => {
    setContext(prev => ({ ...prev, ...newContext }));
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "Hi! I'm your AI assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        metadata: {
          suggestedActions: defaultSuggestions
        }
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  return {
    messages,
    isOpen,
    isTyping,
    sendMessage,
    toggleChat,
    updateContext
  };
}; 