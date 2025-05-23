"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function StoreCard({ store, onRatingSubmit }) {
  const { toast } = useToast()
  const [isRating, setIsRating] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(store.userRating || 0)

  const handleRatingClick = (rating) => {
    setSelectedRating(rating)
    onRatingSubmit(store.id, rating)
    setIsRating(false)

    toast({
      title: "Rating submitted",
      description: `You rated ${store.name} ${rating} out of 5 stars.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{store.name}</CardTitle>
        <CardDescription>{store.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <span className="font-medium">Overall Rating:</span>
          <div className="flex items-center">
            <span className="mr-1">{store.rating.toFixed(1)}</span>
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          </div>
        </div>

        {store.userRating && !isRating ? (
          <div className="flex items-center space-x-2">
            <span className="font-medium">Your Rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`h-5 w-5 cursor-pointer ${
                    rating <= store.userRating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : isRating ? (
          <div className="space-y-2">
            <div className="font-medium">Rate this store:</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`h-6 w-6 cursor-pointer ${
                    rating <= hoveredRating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                  }`}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(selectedRating)}
                  onClick={() => handleRatingClick(rating)}
                />
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsRating(false)}>
              Cancel
            </Button>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        {!isRating && (
          <Button onClick={() => setIsRating(true)} variant="outline" className="w-full">
            {store.userRating ? "Change Rating" : "Rate This Store"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
