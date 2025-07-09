import type { Rating } from '../App'

const STORAGE_KEY = 'brgr8r_ratings'

export function saveRatings(ratings: Rating[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
}

export function loadRatings(): Rating[] {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}
