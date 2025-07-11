import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/auth'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    try {
      await signup(username, password)
      setMessage("Signup successful. Please log in.")
      setError(null)
      setTimeout(() => navigate('/login'), 1000)
    } catch (err: any) {
      setError(err.message)
      setMessage(null)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-purple-600">Sign Up for brgr8r</h1>
      <input
        className="w-full p-2 border rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-2 border rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-2 border rounded"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
        onClick={handleSignup}
      >
        Sign Up
      </button>

      <button
        className="text-sm underline text-purple-500"
        onClick={() => navigate('/login')}
      >
        Already have an account? Log in
      </button>

      {message && <p className="text-green-600 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
