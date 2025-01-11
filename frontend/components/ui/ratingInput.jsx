import { useState } from 'react'

const RatingInput = ({ maxRating = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0)

  const handleRating = (newRating) => {
    setRating(newRating)
    if (onRatingChange) {
      onRatingChange(newRating)
    }
  }

  return (
    <div className="flex space-x-1">
      {[...Array(maxRating)].map((_, index) => (
        <button
          type="button"
          key={index}
          className={`text-2xl ${
            index < rating ? 'text-yellow-400' : 'text-gray-400'
          }`}
          onClick={() => handleRating(index + 1)}
          aria-label={`Rate ${index + 1}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default RatingInput
