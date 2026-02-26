import { useState, useEffect } from "react"
import ChatBox from "./ChatBox"

export default function FreeTimeScreen({ userId, token, isMobile }) {
  const [minutes, setMinutes] = useState(30)
  const [energy, setEnergy] = useState("medium")
  const [timeMessage, setTimeMessage] = useState("")
  const [suggestion, setSuggestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    if (minutes <= 30) {
      setTimeMessage("Short window — we'll find something quick ⚡")
    } else if (minutes <= 60) {
      setTimeMessage("Decent time — room for something good 🎯")
    } else {
      setTimeMessage("Nice chunk — let's make it count 🚀")
    }
  }, [minutes])

  const fetchSuggestion = async () => {
    setLoading(true)
    setSuggestion(null)
    setChatOpen(false)

    try {
      const response = await fetch(
        `http://localhost:3001/suggest?minutes=${minutes}&energy=${energy}&userId=${userId}`
      )
      const data = await response.json()

      setSuggestion(data.suggestion)
      const historyResponse = await fetch(`http://localhost:3001/history?userId=${userId}`)
      const historyData = await historyResponse.json()
      setHistory(historyData)
    } catch (error) {
      setSuggestion("Something went wrong — Is your backend running")
    }

    setLoading(false)
  }

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3001/history?userId=${userId}`)
        const data = await response.json()
        setHistory(data)
      } catch (error) {
        console.log("Could not load history")
      }
    }

    if (userId) {
      loadHistory()
    }
  }, [userId])

  return (
    <div style={{ maxWidth: isMobile ? "100%" : "900px", margin: "0 auto" }}>
      {/* Main Card */}
      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        padding: isMobile ? "20px" : "40px",
        marginBottom: "30px"
      }}>
        {/* Time Selection */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: isMobile ? "18px" : "20px", marginBottom: "15px" }}>
            ⏱️ How much free time do you have?
          </h3>
          <input
            type="range"
            min="0"
            max="120"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            style={{
              width: "100%",
              height: "8px",
              borderRadius: "5px",
              background: "rgba(255, 255, 255, 0.1)",
              outline: "none",
              accentColor: "#667eea"
            }}
          />
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "10px" : "0"
          }}>
            <p style={{ fontSize: isMobile ? "24px" : "28px", fontWeight: "bold", margin: "0" }}>
              {minutes} minutes
            </p>
            <p style={{
              color: "#667eea",
              fontStyle: "italic",
              fontSize: isMobile ? "14px" : "16px",
              margin: "0"
            }}>
              {timeMessage}
            </p>
          </div>
        </div>

        {/* Energy Selection */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: isMobile ? "18px" : "20px", marginBottom: "15px" }}>
            ⚡ Energy level?
          </h3>
          <div style={{
            display: "flex",
            gap: isMobile ? "10px" : "15px",
            justifyContent: "center",
            flexWrap: isMobile ? "wrap" : "nowrap"
          }}>
            {["low", "medium", "high"].map((level) => (
              <button
                key={level}
                onClick={() => setEnergy(level)}
                style={{
                  padding: isMobile ? "10px 20px" : "12px 30px",
                  background: energy === level
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  border: "2px solid " + (energy === level ? "#667eea" : "transparent"),
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: energy === level ? "bold" : "normal",
                  fontSize: isMobile ? "14px" : "16px",
                  transition: "all 0.3s",
                  textTransform: "capitalize",
                  flex: isMobile ? "1" : "none"
                }}
                onMouseOver={(e) => {
                  if (energy !== level) {
                    e.target.style.background = "rgba(255, 255, 255, 0.15)"
                  }
                }}
                onMouseOut={(e) => {
                  if (energy !== level) {
                    e.target.style.background = "rgba(255, 255, 255, 0.1)"
                  }
                }}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Let's Go Button */}
        <div>
          <button
            onClick={fetchSuggestion}
            disabled={minutes < 10 || loading}
            style={{
              width: "100%",
              padding: isMobile ? "14px" : "18px",
              marginTop: "20px",
              background: minutes >= 10
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "rgba(255, 255, 255, 0.1)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: minutes >= 10 ? "pointer" : "not-allowed",
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: "bold",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => {
              if (minutes >= 10) {
                e.target.style.transform = "scale(1.02)"
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)"
            }}
          >
            {loading ? "Finding something for you... 🔍" : "Let's Go 🎲"}
          </button>

          {minutes < 10 && (
            <p style={{
              marginTop: "12px",
              color: "#ff6b6b",
              fontSize: isMobile ? "13px" : "14px",
              textAlign: "center",
              fontWeight: "bold"
            }}>
              ⚠️ Please select more than 10 minutes
            </p>
          )}
        </div>
      </div>

      {/* Suggestion */}
      {suggestion && (
        <div style={{
          background: "rgba(102, 126, 234, 0.1)",
          border: "2px solid #667eea",
          borderRadius: "15px",
          padding: isMobile ? "15px" : "25px",
          marginBottom: "30px"
        }}>
          <p style={{
            fontSize: isMobile ? "16px" : "18px",
            lineHeight: "1.6",
            margin: "0 0 20px 0"
          }}>
            🎯 <strong>{suggestion}</strong>
          </p>

          {!chatOpen && (
            <button
              onClick={() => setChatOpen(true)}
              style={{
                padding: isMobile ? "8px 15px" : "10px 20px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: isMobile ? "13px" : "14px",
                fontWeight: "bold",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.target.style.transform = "scale(1)"}
            >
              Ask AI about this 💬
            </button>
          )}

          {chatOpen && <ChatBox suggestion={suggestion} userId={userId} isMobile={isMobile} />}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div>
          <h3 style={{
            fontSize: isMobile ? "20px" : "24px",
            marginBottom: "20px"
          }}>
            📚 Your Past Suggestions
          </h3>
          <div style={{
            display: "grid",
            gap: isMobile ? "10px" : "15px"
          }}>
            {history.map((item) => (
              <div key={item._id} style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderLeft: "4px solid #667eea",
                borderRadius: "12px",
                padding: isMobile ? "15px" : "20px",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"
                e.currentTarget.style.transform = "translateX(5px)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"
                e.currentTarget.style.transform = "translateX(0)"
              }}>
                <p style={{
                  margin: "0 0 12px 0",
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: "1.5"
                }}>
                  {item.suggestion}
                </p>
                <div style={{
                  display: "flex",
                  gap: isMobile ? "10px" : "15px",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: isMobile ? "12px" : "14px",
                  flexWrap: "wrap"
                }}>
                  <span>⏱️ {item.minutes} mins</span>
                  <span>⚡ {item.energy} energy</span>
                  <span>📅 {new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}