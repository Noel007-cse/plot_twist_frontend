import { useState, useEffect } from "react"

export default function InterestsScreen({ userId, email, onInterestsSet }) {
  const [selectedInterests, setSelectedInterests] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const availableInterests = [
    "Fitness",
    "Learning",
    "Movies",
    "Music",
    "Reading",
    "Gaming",
    "Art",
    "Cooking",
    "Meditation",
    "Travel"
  ]

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleSaveInterests = async () => {
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3001/update-interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          interests: selectedInterests
        })
      })

      const data = await response.json()

      if (data.success) {
        onInterestsSet(selectedInterests)
      }
    } catch (error) {
      console.log("Error saving interests:", error.message)
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      padding: isMobile ? "20px" : "40px"
    }}>
      <div style={{
        maxWidth: "700px",
        width: "100%",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        padding: isMobile ? "30px 20px" : "50px",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "white"
      }}>
        <h2 style={{
          fontSize: isMobile ? "24px" : "32px",
          marginBottom: "10px",
          textAlign: "center"
        }}>
          What are your interests? 🎯
        </h2>
        <p style={{
          color: "rgba(255, 255, 255, 0.7)",
          textAlign: "center",
          marginBottom: "40px",
          fontSize: isMobile ? "14px" : "16px"
        }}>
          Select as many as you like (at least 1)
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr",
          gap: isMobile ? "10px" : "15px",
          marginBottom: "30px"
        }}>
          {availableInterests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              style={{
                padding: isMobile ? "12px" : "16px",
                background: selectedInterests.includes(interest)
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "2px solid " + (selectedInterests.includes(interest) ? "#667eea" : "transparent"),
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: selectedInterests.includes(interest) ? "bold" : "normal",
                fontSize: isMobile ? "14px" : "16px",
                transition: "all 0.3s",
                transform: selectedInterests.includes(interest) ? "scale(1.05)" : "scale(1)"
              }}
              onMouseOver={(e) => {
                if (!selectedInterests.includes(interest)) {
                  e.target.style.background = "rgba(255, 255, 255, 0.15)"
                }
              }}
              onMouseOut={(e) => {
                if (!selectedInterests.includes(interest)) {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)"
                }
              }}
            >
              {interest}
            </button>
          ))}
        </div>

        <button
          onClick={handleSaveInterests}
          disabled={loading || selectedInterests.length === 0}
          style={{
            width: "100%",
            padding: isMobile ? "14px" : "16px",
            background: selectedInterests.length > 0
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: selectedInterests.length > 0 ? "pointer" : "not-allowed",
            fontSize: isMobile ? "14px" : "18px",
            fontWeight: "bold",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => {
            if (selectedInterests.length > 0) {
              e.target.style.transform = "scale(1.02)"
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)"
          }}
        >
          {loading ? "Saving..." : `Continue with ${selectedInterests.length} interest${selectedInterests.length !== 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  )
}