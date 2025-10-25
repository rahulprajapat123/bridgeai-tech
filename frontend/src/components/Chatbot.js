import { useState } from 'react';

// Chatbot Component
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I\'m the BridgeAI assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');

  const quickResponses = [
    { question: 'What services do you offer?', answer: 'We offer three main services: Consulting/Advisory for AI strategy, Design/Build/Deploy for custom solutions, and Role-specific Training. Would you like to know more about any of these?' },
    { question: 'What platforms do you support?', answer: 'We deploy on Azure, GCP, on-premises infrastructure, and VDI environments. All with enterprise security and compliance built in.' },
    { question: 'How do I get started?', answer: 'The best way to get started is to contact us at hello@bridgeaitech.com or fill out our contact form. We\'ll schedule a discovery call to understand your needs.' }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages([...messages, userMessage]);

    // Simple response logic
    setTimeout(() => {
      const matchedResponse = quickResponses.find(r =>
        input.toLowerCase().includes(r.question.toLowerCase().split(' ')[0])
      );

      const botResponse = {
        type: 'bot',
        text: matchedResponse
          ? matchedResponse.answer
          : 'Thank you for your message! For detailed information, please contact us at hello@bridgeaitech.com or visit our contact page.'
      };

      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all z-50 group"
      >
        <span className="text-2xl">💬</span>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-slate-900 rounded-xl shadow-2xl border border-slate-700 z-50 flex flex-col">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🤖</span>
          <div>
            <div className="font-semibold text-white">BridgeAI Assistant</div>
            <div className="text-xs text-cyan-100">Online</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded p-1"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none text-sm text-white"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 rounded-lg hover:shadow-lg transition-all"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;