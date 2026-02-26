import { useState, useEffect } from "react"

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const endpoint = isSignup ? "/signup" : "/login"
    const url = `http://localhost:3001${endpoint}`

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        onLoginSuccess({
          token: data.token,
          userId: data.userId,
          email: data.email
        })
      }
    } catch (err) {
      setError("Connection failed — is your backend running?")
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: isMobile ? "20px" : "0"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        padding: isMobile ? "30px 20px" : "50px",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        maxWidth: isMobile ? "100%" : "450px",
        width: "100%"
      }}>
        <h1 style={{
          textAlign: "center",
          fontSize: isMobile ? "24px" : "32px",
          marginBottom: "10px",
          color: "white"
        }}>
          Plot Twist 🎲
        </h1>
        <p style={{
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.8)",
          marginBottom: "40px",
          fontSize: isMobile ? "14px" : "16px"
        }}>
          Your personal activity suggester
        </p>

        <h2 style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: isMobile ? "20px" : "24px",
          color: "white"
        }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: isMobile ? "12px" : "14px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              fontSize: isMobile ? "14px" : "16px",
              boxSizing: "border-box"
            }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: isMobile ? "12px" : "14px",
              marginBottom: "25px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              fontSize: isMobile ? "14px" : "16px",
              boxSizing: "border-box"
            }}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: isMobile ? "12px" : "14px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "bold",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {error && (
          <p style={{
            color: "#ff6b6b",
            textAlign: "center",
            marginTop: "15px",
            fontSize: isMobile ? "12px" : "14px"
          }}>
            ❌ {error}
          </p>
        )}

        <p style={{
          textAlign: "center",
          marginTop: "30px",
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: isMobile ? "13px" : "16px"
        }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              marginLeft: "8px",
              textDecoration: "underline",
              fontSize: isMobile ? "13px" : "16px",
              fontWeight: "bold"
            }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  )
}