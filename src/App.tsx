import React, { useState, useEffect } from 'react';
import { Headphones } from 'lucide-react';
import VoiceInterface from './components/VoiceInterface';
import ConversationDisplay from './components/ConversationDisplay';
import SearchProgress from './components/SearchProgress';
import DealComparison from './components/DealComparison';
import { ConversationMessage, Deal } from './types';
import { generateMockDeals, findTopDeals } from './data/mockSellers';

function App() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [topDeals, setTopDeals] = useState<Deal[]>([]);
  const [currentAgentResponse, setCurrentAgentResponse] = useState('');

  // Initial greeting when app loads
  useEffect(() => {
    const initialGreeting = "Hi, I'm DealFinder! I can help you find the best deals on high-demand items like sneakers or concert tickets. What are you looking for today?";
    
    const initialMessage: ConversationMessage = {
      id: `agent-${Date.now()}`,
      text: initialGreeting,
      sender: 'agent',
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    setCurrentAgentResponse(initialGreeting);
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const handleUserInput = (text: string) => {
    // Add user message to conversation
    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Process user input
    processUserInput(text);
  };

  const processUserInput = (text: string) => {
    // Check if this is the first user message (item search)
    if (!searchItem) {
      setSearchItem(text);
      startSearchProcess(text);
    } else {
      // Handle follow-up questions or commands
      const response = generateFollowUpResponse(text);
      addAgentMessage(response);
    }
  };

  const startSearchProcess = (item: string) => {
    // Inform user that search is starting
    const searchStartMessage = `I'll find the best deals on ${item} for you. Let me contact our network of sellers...`;
    addAgentMessage(searchStartMessage);
    
    // Start the search progress simulation
    setIsSearching(true);
    setSearchProgress(0);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          completeSearch(item);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const completeSearch = (item: string) => {
    setIsSearching(false);
    
    // Generate mock deals
    const allDeals = generateMockDeals(item);
    const best = findTopDeals(allDeals);
    setTopDeals(best);
    
    // Create summary message
    const dealSummary = `
      I've found the top 3 deals for ${item}:
      
      1. ${best[0].seller}: $${best[0].price} - ${best[0].availability}, delivery in ${best[0].deliveryTime}
      2. ${best[1].seller}: $${best[1].price} - ${best[1].availability}, delivery in ${best[1].deliveryTime}
      3. ${best[2].seller}: $${best[2].price} - ${best[2].availability}, delivery in ${best[2].deliveryTime}
      
      I recommend the ${best[0].seller} option as it offers the best combination of price and delivery time. Would you like me to proceed with this option or would you prefer one of the others?
    `;
    
    addAgentMessage(dealSummary);
  };

  const generateFollowUpResponse = (text: string) => {
    // Simple response logic based on user input
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('email') || lowerText.includes('send')) {
      return "I've sent an email with the top 3 deals to your registered email address. You should receive it shortly!";
    } else if (lowerText.includes('proceed') || lowerText.includes('first') || lowerText.includes('recommend')) {
      return `Great choice! I've initiated the purchase process with ${topDeals[0].seller}. You'll receive a confirmation shortly. Is there anything else you need help with?`;
    } else if (lowerText.includes('second')) {
      return `I'll proceed with the ${topDeals[1].seller} option. I've initiated the purchase process and you'll receive a confirmation shortly. Is there anything else you need help with?`;
    } else if (lowerText.includes('third')) {
      return `I'll proceed with the ${topDeals[2].seller} option. I've initiated the purchase process and you'll receive a confirmation shortly. Is there anything else you need help with?`;
    } else if (lowerText.includes('thank') || lowerText.includes('bye')) {
      return "You're welcome! Feel free to come back anytime you need help finding the best deals. Have a great day!";
    } else {
      return "I'm not sure I understand. Would you like to proceed with one of the deals I found, or would you like me to search for something else?";
    }
  };

  const addAgentMessage = (text: string) => {
    const agentMessage: ConversationMessage = {
      id: `agent-${Date.now()}`,
      text,
      sender: 'agent',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, agentMessage]);
    setCurrentAgentResponse(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Headphones size={28} className="mr-2" />
          <h1 className="text-2xl font-bold">DealFinder Voice Agent</h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto p-4 flex flex-col max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg flex-1 flex flex-col overflow-hidden">
          {/* Conversation area */}
          <ConversationDisplay messages={messages} />
          
          {/* Search progress */}
          <div className="p-4 border-t border-gray-200">
            <SearchProgress isSearching={isSearching} progress={searchProgress} />
            
            {/* Deal comparison */}
            {topDeals.length > 0 && (
              <DealComparison deals={topDeals} />
            )}
            
            {/* Voice interface */}
            <VoiceInterface 
              onUserInput={handleUserInput}
              isListening={isListening}
              toggleListening={toggleListening}
              agentResponse={currentAgentResponse}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <p>© 2025 DealFinder Voice Agent | All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;