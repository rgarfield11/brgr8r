import { useEffect, useState } from 'react'
import brgrLogo from '../public/brgr.svg'
import RatingForm from './components/RatingForm'
import RatingList from './components/RatingList'
import { saveRatings, loadRatings } from './utils/storage'
import './App.css'

export type Rating = {
  id: string
  restaurant: string
  rating: number
  notes: string
}

function App() {
  const [formOpen, setFormOpen] = useState(false)
  const [ratings, setRatings] = useState<Rating[]>([])
  const [hasLoaded, setHasLoaded] = useState(false)

useEffect(() => {
  const stored = loadRatings()
  setRatings(stored)
  setHasLoaded(true)
}, [])

useEffect(() => {
  if (hasLoaded) {
    saveRatings(ratings)
  }
}, [ratings, hasLoaded])

  const handleAddRating = (newRating: Rating) => {
    setRatings([newRating, ...ratings])
    setFormOpen(false)
  }

  const handleDeleteRating = (id: string) => {
  setRatings(ratings.filter(r => r.id !== id))
}

  return (
  <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">
    <img src={brgrLogo} alt="brgr logo" className="w-24 h-24" />
    <h1 className="text-4xl font-bold text-purple-600">brgr8r</h1>
    <button
      className="mt-2 text-gray-700 underline"
      onClick={() => setFormOpen(!formOpen)}
    >
      {formOpen ? 'Cancel' : 'r8 wat u 8.'}
    </button>

    {formOpen && <RatingForm onSubmit={handleAddRating} />}

    <RatingList ratings={ratings} onDelete={handleDeleteRating} />
  </div>
)
}

export default App
