import { useEffect, useState } from 'react'
import RatingForm from '../components/RatingForm'
import RatingList from '../components/RatingList'

export type Rating = {
  id: string
  restaurant: string
  rating: number
  notes: string
}

type HomeProps = {
  user: { username: string }
  setUser: (u: null) => void
}

export default function Home({ user, setUser }: HomeProps) {
  const [ratings, setRatings] = useState<Rating[]>([])

  const storageKey = `brgr8r_ratings_${user.username}`

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored) setRatings(JSON.parse(stored))
  }, [user.username])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(ratings))
  }, [ratings, user.username])

  const handleAddRating = (entry: Rating) => {
    setRatings([entry, ...ratings])
  }

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this rating?")
    if (confirmed) setRatings(ratings.filter(r => r.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-600">brgr8r</h1>
        <button
          className="text-sm underline text-red-500"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>

      <p className="text-gray-600">Welcome, <strong>{user.username}</strong>!</p>

      <RatingForm onSubmit={handleAddRating} />
      <RatingList ratings={ratings} onDelete={handleDelete} />
    </div>
  )
}
