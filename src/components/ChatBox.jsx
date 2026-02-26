import { useState } from "react"

export default function ChatBox({ suggestion, userId, isMobile }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", text: input }
    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("https://plot-twist-backend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          suggestion,
          userMessage: input
        })
      })

      const data = await response.json()

      const aiMessage = { role: "assistant", text: data.response }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Error connecting to chat" }])
    }

    setLoading(false)
  }

  return (
    <div style={{
      marginTop: "20px",
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      padding: isMobile ? "15px" : "20px"
    }}>
      <h4 style={{ margin: "0 0 15px 0", fontSize: isMobile ? "14px" : "16px" }}>
        💬 Chat about this
      </h4>

      <div style={{
        maxHeight: isMobile ? "250px" : "350px",
        overflowY: "auto",
        marginBottom: "15px",
        padding: "15px",
        background: "rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        {messages.length === 0 ? (
          <p style={{
            color: "rgba(255, 255, 255, 0.5)",
            textAlign: "center",
            margin: "0",
            fontSize: isMobile ? "13px" : "14px"
          }}>
            Ask anything about this suggestion...
          </p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: isMobile ? "100%" : "80%",
              padding: isMobile ? "10px 12px" : "12px 15px",
              background: msg.role === "user"
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              color: "white",
              fontSize: isMobile ? "13px" : "14px",
              lineHeight: "1.4",
              wordBreak: "break-word"
            }}>
              {msg.text}
            </div>
          ))
        )}
        {loading && (
          <div style={{
            alignSelf: "flex-start",
            padding: isMobile ? "10px 12px" : "12px 15px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: isMobile ? "13px" : "14px"
          }}>
            AI is thinking... ✨
          </div>
        )}
      </div>

      <div style={{
        display: "flex",
        gap: isMobile ? "8px" : "10px",
        flexWrap: isMobile ? "wrap" : "nowrap"
      }}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          style={{
            flex: 1,
            minWidth: isMobile ? "100%" : "auto",
            padding: isMobile ? "10px" : "12px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.08)",
            color: "white",
            fontSize: isMobile ? "13px" : "14px"
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          style={{
            padding: isMobile ? "10px 12px" : "12px 20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: isMobile ? "13px" : "14px",
            transition: "all 0.3s",
            whiteSpace: "nowrap"
          }}
          onMouseOver={(e) => !loading && (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          {loading ? "..." : isMobile ? "↳" : "Send"}
        </button>
      </div>
    </div>
  )
}
