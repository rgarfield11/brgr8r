import { useState } from 'react'

type RatingFormProps = {
  onSubmit: (entry: {
    id: string
    restaurant: string
    rating: number
    notes: string
  }) => void
}

export default function RatingForm({ onSubmit }: RatingFormProps) {
  const [restaurant, setRestaurant] = useState('')
  const [rating, setRating] = useState(3)
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      id: Date.now().toString(),
      restaurant,
      rating,
      notes
    })
    // Reset form
    setRestaurant('')
    setRating(3)
    setNotes('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md w-full max-w-md mt-6 space-y-4"
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Restaurant name"
        value={restaurant}
        onChange={(e) => setRestaurant(e.target.value)}
        required
      />
      <select
        className="w-full border p-2 rounded"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 && 's'}
          </option>
        ))}
      </select>
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Submit Rating
      </button>
    </form>
  )
}
