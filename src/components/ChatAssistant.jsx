import { useState, useRef, useEffect } from 'react';

const WORKER_URL = 'https://jeremiah-rivas-chat.vst6v8gb89.workers.dev';

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/`(.*?)`/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '- ')
    .trim();
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "I can answer questions about Jerry's background, experience, and published work. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input.trim() };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated })
      });
      const data = await res.json();
      setMessages([...updated, { role: 'assistant', content: stripMarkdown(data.reply) }]);
    } catch {
      setMessages([...updated, {
        role: 'assistant',
        content: 'Something went wrong. Reach out directly at jerrymrivas@protonmail.com.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const CHAT_HEIGHT = 320;

  return (
    <section id="assistant" style={{
      background: '#f5f5f0',
      borderBottom: '3px solid #1e2d40',
      padding: '2rem 0'
    }}>
      <div className="max-w-screen-xl mx-auto px-6">
        <p style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '0.82rem',
          color: '#5a5a5a',
          lineHeight: '1.5',
          marginBottom: '1rem'
        }}>
          A professional assistant grounded in Jerry's background, methodology, and published work. Ask anything about his experience, credentials, or approach to governance and risk.
        </p>

        <div className="ask-jerry-outer" style={{
          display: 'flex',
          alignItems: 'stretch',
          border: '3px solid #1e2d40',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(30,45,64,0.13)',
          height: CHAT_HEIGHT + 'px'
        }}>

          <div className="ask-jerry-panel" style={{
            width: '260px',
            flexShrink: 0,
            background: '#e8ebe4',
            borderRight: '3px solid #1e2d40',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img
              src="/ask-jerry-final.PNG"
              alt="Ask Jerry"
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center center',
                display: 'block'
              }}
            />
          </div>

          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
            minWidth: 0
          }}>
            <div ref={containerRef} style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  background: msg.role === 'user' ? '#1e2d40' : '#f5f5f0',
                  color: msg.role === 'user' ? '#fff' : '#1a1a1a',
                  padding: '0.6rem 0.9rem',
                  borderRadius: '4px',
                  fontSize: '0.88rem',
                  lineHeight: '1.5',
                  fontFamily: 'system-ui, sans-serif'
                }}>
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div style={{
                  alignSelf: 'flex-start',
                  background: '#f5f5f0',
                  padding: '0.6rem 0.9rem',
                  borderRadius: '4px',
                  fontSize: '0.88rem',
                  color: '#888',
                  fontFamily: 'system-ui, sans-serif'
                }}>...</div>
              )}
            </div>

            <div style={{
              borderTop: '2px solid #1e2d40',
              padding: '0.75rem',
              display: 'flex',
              gap: '0.5rem',
              background: '#fff'
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about experience, credentials, target roles..."
                disabled={loading}
                style={{
                  flex: 1,
                  border: '1px solid #b0b8aa',
                  borderRadius: '4px',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.88rem',
                  fontFamily: 'system-ui, sans-serif',
                  outline: 'none',
                  background: '#fff'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  background: '#1e2d40',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.88rem',
                  fontFamily: 'system-ui, sans-serif',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.6 : 1
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
