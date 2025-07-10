import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'

export default function Login({ setToken }: { setToken: (token: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await login(username, password)
      setToken(res.access_token)
      localStorage.setItem("token", res.access_token)
      setError(null)
      navigate('/')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-purple-600">Login to brgr8r</h1>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Log In
        </button>
      </form>

      <button
        className="text-sm underline text-purple-500"
        onClick={() => navigate('/sign-up')}
      >
        Don’t have an account? Sign up
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
