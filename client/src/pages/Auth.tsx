import { useState } from 'react'
import { signup, login } from '../api/auth'

export default function Auth({ setToken }: { setToken: (token: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSignup = async () => {
    try {
      await signup(username, password)
      setMessage("Signup successful. Now log in.")
      setError(null)
    } catch (err: any) {
      setError(err.message)
      setMessage(null)
    }
  }

  const handleLogin = async () => {
    try {
      const res = await login(username, password)
      setToken(res.access_token)
      localStorage.setItem("token", res.access_token)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-purple-600">brgr8r</h1>
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

      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>

      {message && <p className="text-green-600 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
