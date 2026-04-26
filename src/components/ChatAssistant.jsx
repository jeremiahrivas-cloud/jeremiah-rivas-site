import { useState, useRef, useEffect } from "react";

const WORKER_URL = "https://jeremiah-rivas-chat.vst6v8gb89.workers.dev";

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/`(.*?)`/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "- ")
    .trim();
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "I can answer questions about Jerry's background, experience, and target roles. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input.trim() };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated })
      });
      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: stripMarkdown(data.reply) }]);
    } catch {
      setMessages([...updated, {
        role: "assistant",
        content: "Something went wrong. Reach out directly at jerrymrivas@protonmail.com."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const CHAT_HEIGHT = 340;

  return (
    <section id="assistant" style={{ background: "#f5f5f0", borderTop: "1px solid #e0e0d8", borderBottom: "1px solid #e0e0d8", padding: "2rem 0" }}>
      <div className="max-w-screen-xl mx-auto px-6">
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1.25rem" }}>

          {/* Ask Jerry image — matches chat height */}
          <div style={{ flexShrink: 0, height: `${CHAT_HEIGHT}px`, display: "flex", alignItems: "flex-end" }}>
            <img
              src="/ask-jerry.PNG"
              alt="Ask Jerry"
              style={{ height: "100%", width: "auto", objectFit: "contain", objectPosition: "bottom" }}
            />
          </div>

          {/* Chat column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Descriptor */}
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.82rem", color: "#5a5a5a", lineHeight: "1.5", marginBottom: "0.75rem" }}>
              A personalized career intelligence assistant trained on Jerry's professional background, methodology, and philosophy. Ask anything about his experience, target roles, or approach to governance and risk.
            </p>

            {/* Chat window */}
            <div style={{ background: "#fff", border: "1px solid #e0e0d8", borderRadius: "4px", display: "flex", flexDirection: "column", height: `${CHAT_HEIGHT}px` }}>
              <div ref={containerRef} style={{ flex: 1, overflowY: "auto", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                    background: msg.role === "user" ? "#7a8b6e" : "#f5f5f0",
                    color: msg.role === "user" ? "#fff" : "#1a1a1a",
                    padding: "0.6rem 0.9rem",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    fontFamily: "system-ui, sans-serif"
                  }}>
                    {msg.content}
                  </div>
                ))}
                {loading && (
                  <div style={{ alignSelf: "flex-start", background: "#f5f5f0", padding: "0.6rem 0.9rem", borderRadius: "4px", fontSize: "0.9rem", color: "#888", fontFamily: "system-ui, sans-serif" }}>...</div>
                )}
              </div>
              <div style={{ borderTop: "1px solid #e0e0d8", padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about experience, credentials, target roles..."
                  disabled={loading}
                  style={{ flex: 1, border: "1px solid #e0e0d8", borderRadius: "4px", padding: "0.5rem 0.75rem", fontSize: "0.9rem", fontFamily: "system-ui, sans-serif", outline: "none", background: "#fff" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  style={{ background: "#7a8b6e", color: "#fff", border: "none", borderRadius: "4px", padding: "0.5rem 1.25rem", fontSize: "0.9rem", fontFamily: "system-ui, sans-serif", cursor: loading ? "not-allowed" : "pointer", opacity: loading || !input.trim() ? 0.6 : 1 }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}