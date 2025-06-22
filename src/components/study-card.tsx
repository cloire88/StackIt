"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Eye, EyeOff } from "lucide-react"

interface StudyCardProps {
  card: {
    id: string
    front: string
    back: string
  }
  onReview: (cardId: string, quality: number) => void
  onNext: () => void
}

export function StudyCard({ card, onReview, onNext }: StudyCardProps) {
  const [showAnswer, setShowAnswer] = useState(false)
  const [reviewed, setReviewed] = useState(false)

  const handleQualityClick = (quality: number) => {
    onReview(card.id, quality)
    setReviewed(true)
  }

  const handleNext = () => {
    setShowAnswer(false)
    setReviewed(false)
    onNext()
  }

  const qualityButtons = [
    { label: "Again", quality: 1, color: "bg-red-500 hover:bg-red-600" },
    { label: "Hard", quality: 2, color: "bg-orange-500 hover:bg-orange-600" },
    { label: "Good", quality: 3, color: "bg-green-500 hover:bg-green-600" },
    { label: "Easy", quality: 4, color: "bg-blue-500 hover:bg-blue-600" },
    { label: "Very Easy", quality: 5, color: "bg-purple-500 hover:bg-purple-600" },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          {showAnswer ? "Answer" : "Question"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="min-h-[200px] flex items-center justify-center text-center">
          <p className="text-lg">
            {showAnswer ? card.back : card.front}
          </p>
        </div>

        {!showAnswer ? (
          <div className="flex justify-center">
            <Button
              onClick={() => setShowAnswer(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              Show Answer
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {!reviewed ? (
              <div className="grid grid-cols-5 gap-2">
                {qualityButtons.map((button) => (
                  <Button
                    key={button.quality}
                    onClick={() => handleQualityClick(button.quality)}
                    className={button.color}
                    size="sm"
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <Button
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Next Card
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 