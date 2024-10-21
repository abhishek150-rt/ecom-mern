import { StarIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const StarRating = ({ rating, handleRatingChange }) => {
  return (
    [1, 2, 3, 4, 5].map(star =>
      <Button
        className={`p-2 rounded-full transition-colors ${star <= rating ? "text-yellow-500" : "text-black"}`}
        variant="outline"
        size="icon"
        onClick={() => handleRatingChange(star)}
      >
        <StarIcon
          className={`w-6 h-6 
          ${star <= rating ? "fill-yellow-400" : ""}
          `}
        />
      </Button>)
  )
}

export default StarRating