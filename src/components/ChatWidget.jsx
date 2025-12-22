import { useState, useRef, useEffect } from 'react';

const PROPERTY_CONTEXT = `You are a knowledgeable and friendly property concierge for Woody Creek Ranch, a 1,500-acre luxury estate development in Collin County, Texas, just 20 minutes north of Plano.

Key facts about the property:
- Established in 1982, assembled over 40+ years
- Seven 15-acre lakes stocked with trophy bass and managed fish populations
- 800-acre working tree farm
- 200-head Black Angus cow-calf operation
- High-fence deer program with native Texas whitetail
- Produces approximately 3,000 bales of hay annually
- Features lakes, creeks, streams, woods, and open meadows
- Miles of walking trails planned throughout the property
- Perhaps the most diverse piece of property in North Texas

Homesite options include:
- Lakefront estates with private shoreline
- Creek-side homesites along flowing water
- Woodland retreats surrounded by mature trees
- Meadow view lots with open vistas

The vision is conservation-focused: selectively placing homesites while preserving the land's natural character. This is not subdivision—it's preservation with purpose.

Keep responses warm, helpful, and concise (2-3 sentences typically). If asked about specific pricing, lot sizes, or availability, encourage them to schedule a private tour or request more information. Never make up specific numbers you don't know.`;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to Woody Creek Ranch. How can I help you explore our property today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          systemPrompt: PROPERTY_CONTEXT
        })
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again or contact us directly to learn more about Woody Creek Ranch.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-amber-700 hover:bg-amber-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-stone-900 rounded-2xl shadow-2xl border border-stone-700 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-800 to-stone-900 px-5 py-4 border-b border-stone-700">
            <h3 className="text-amber-500 font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Ask About Woody Creek
            </h3>
            <p className="text-stone-400 text-xs mt-1" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
              Your personal property concierge
            </p>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-amber-700 text-white rounded-br-md'
                      : 'bg-stone-800 text-stone-200 rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-800 text-stone-400 px-4 py-2 rounded-2xl rounded-bl-md text-sm">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-stone-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the property..."
                className="flex-1 bg-stone-800 text-white placeholder-stone-500 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                style={{ fontFamily: "'Libre Franklin', sans-serif" }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-amber-700 hover:bg-amber-800 disabled:bg-stone-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-full transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
