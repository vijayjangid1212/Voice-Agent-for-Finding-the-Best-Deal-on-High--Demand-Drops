import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import 'regenerator-runtime/runtime';

interface VoiceInterfaceProps {
  onUserInput: (text: string) => void;
  isListening: boolean;
  toggleListening: () => void;
  agentResponse: string;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ 
  onUserInput, 
  isListening, 
  toggleListening,
  agentResponse 
}) => {
  const [userInput, setUserInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Text-to-speech for agent responses
  useEffect(() => {
    if (agentResponse && !isSpeaking) {
      speakText(agentResponse);
    }
  }, [agentResponse]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      onUserInput(userInput);
      setUserInput('');
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        
        {isSpeaking && (
          <div className="flex items-center text-sm text-gray-600">
            <Volume2 size={16} className="mr-1" />
            <span>Speaking...</span>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default VoiceInterface;