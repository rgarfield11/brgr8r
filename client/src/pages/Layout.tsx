import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@api/auth'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'

export default function Layout() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("token")
    if (stored) {
      setToken(stored)
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setUser(user)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err)
          localStorage.removeItem("token")
          setToken(null)
          setUser(null)
          setLoading(false)
        })
    }
  }, [token])

  if (loading) return <div>Loading...</div>

  // User is logged in, show app
  if (user) {
    return (
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/sign-up" element={<Navigate to="/" />} />
      </Routes>
    )
  }

  // Not logged in
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
