import type { Rating } from '../App'
import { TrashIcon } from '@heroicons/react/24/outline'

type RatingListProps = {
  ratings: Rating[]
  onDelete: (id: string) => void
}

export default function RatingList({ ratings, onDelete }: RatingListProps) {
  if (ratings.length === 0) {
    return <p className="mt-6 text-gray-500">No burgers rated yet 🍔</p>
  }

  return (
    <div className="mt-6 w-full max-w-md space-y-4">
      {ratings.map((r) => (
        <div
          key={r.id}
          className="relative bg-white p-4 rounded shadow border border-gray-100"
        >
          {/* Trash icon in top-right corner */}
          <button
            onClick={() => {
							const confirmed = window.confirm(`Are you sure you want to delete your r8ing for ${r.restaurant}?`)
							if (confirmed) onDelete(r.id)
            }}
            className="absolute top-2 right-2 text-gray-300 hover:text-gray-400"
            aria-label="Delete rating"
          >
            <TrashIcon className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-semibold text-purple-700">{r.restaurant}</h2>
          <p className="text-yellow-500 text-lg">
            {'⭐'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
          </p>
          {r.notes && (
            <p className="text-sm text-gray-600 mt-1">{r.notes}</p>
          )}
        </div>
      ))}
    </div>
  )
}
