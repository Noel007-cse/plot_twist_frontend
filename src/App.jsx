import { useState, useEffect, useCallback } from "react"
import LoginScreen from "./components/LoginScreen"
import FreeTimeScreen from "./components/FreeTimeScreen"
import InterestsScreen from "./components/InterestsScreen"

export default function App() {
  const [user, setUser] = useState(null)
  const [interestsSet, setInterestsSet] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const checkInterests = useCallback(async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/get-interests?userId=${userId}`)
      const data = await response.json()
      
      if (data.interests && Array.isArray(data.interests) && data.interests.length > 0) {
        setInterestsSet(true)
      } else {
        setInterestsSet(false)
      }
    } catch (error) {
      console.log("Error checking interests:", error.message)
      setInterestsSet(false)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUserId = localStorage.getItem("userId")
    const storedEmail = localStorage.getItem("email")

    if (storedToken && storedUserId) {
      setUser({ token: storedToken, userId: storedUserId, email: storedEmail })
      checkInterests(storedUserId)
    } else {
      setLoading(false)
    }
  }, [checkInterests])

  const handleLoginSuccess = async (userData) => {
    localStorage.setItem("token", userData.token)
    localStorage.setItem("userId", userData.userId)
    localStorage.setItem("email", userData.email)

    setUser(userData)
    
    try {
      const response = await fetch(`http://localhost:3001/get-interests?userId=${userData.userId}`)
      const data = await response.json()
      
      if (data.interests && Array.isArray(data.interests) && data.interests.length > 0) {
        setInterestsSet(true)
      } else {
        setInterestsSet(false)
      }
    } catch (error) {
      setInterestsSet(false)
    }
  }

  const handleInterestsSet = (interests) => {
    setInterestsSet(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("email")

    setUser(null)
    setInterestsSet(false)
  }

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <p style={{ fontSize: "20px", color: "white" }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      color: "white",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column"
    }}>
      {!user ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : !interestsSet ? (
        <InterestsScreen
          userId={user.userId}
          email={user.email}
          onInterestsSet={handleInterestsSet}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
    <header style={{
  background: "rgba(0, 0, 0, 0.3)",
  borderBottom: "2px solid #667eea",
  padding: isMobile ? "12px 15px" : "20px 40px",
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  justifyContent: "space-between",
  alignItems: isMobile ? "flex-start" : "center",
  gap: isMobile ? "10px" : "20px",
  flex: "0 0 auto",
  width: "100%"
}}>
  <h1 style={{
    margin: 0,
    fontSize: isMobile ? "16px" : "28px",
    fontWeight: "bold",
    minWidth: isMobile ? "auto" : "fit-content"
  }}>
    Plot Twist 🎲
  </h1>
  
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "8px" : "20px",
    marginLeft: isMobile ? "0" : "auto",
    width: isMobile ? "100%" : "auto",
    justifyContent: isMobile ? "space-between" : "flex-end",
    flexWrap: isMobile ? "wrap" : "nowrap"
  }}>
    <p style={{
      margin: 0,
      fontSize: isMobile ? "11px" : "16px",
      minWidth: isMobile ? "auto" : "fit-content",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      flex: isMobile ? "1" : "auto"
    }}>
      {user.email}
    </p>
    
    <button
      onClick={() => setInterestsSet(false)}
      style={{
        padding: isMobile ? "6px 10px" : "10px 20px",
        backgroundColor: "#667eea",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: isMobile ? "11px" : "14px",
        transition: "all 0.3s",
        whiteSpace: "nowrap",
        flex: isMobile ? "0 0 auto" : "none"
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#764ba2"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#667eea"}
    >
      {isMobile ? "Edit" : "Edit Interests ⚙️"}
    </button>
    
    <button
      onClick={handleLogout}
      style={{
        padding: isMobile ? "6px 10px" : "10px 20px",
        backgroundColor: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: isMobile ? "11px" : "14px",
        transition: "all 0.3s",
        whiteSpace: "nowrap",
        flex: isMobile ? "0 0 auto" : "none"
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#c0392b"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#e74c3c"}
    >
      {isMobile ? "Out" : "Logout"}
    </button>
  </div>
</header>
         <div style={{
  padding: isMobile ? "15px" : "40px",
  flex: "1",
  overflowY: "auto"
}}>
  <FreeTimeScreen userId={user.userId} token={user.token} isMobile={isMobile} />
</div>
        </div>
      )}
    </div>
  )
}