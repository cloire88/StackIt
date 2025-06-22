"use client"

import { useState, useEffect } from "react"
import { StudyCard } from "./study-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"

interface StudySessionProps {
  cards: Array<{
    id: string
    front: string
    back: string
  }>
  onFinish: () => void
  onBack: () => void
}

interface StudyResult {
  cardId: string
  quality: number
  timestamp: string
}

export function StudySession({ cards, onFinish, onBack }: StudySessionProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [studyResults, setStudyResults] = useState<StudyResult[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const currentCard = cards[currentCardIndex]
  const isLastCard = currentCardIndex === cards.length - 1

  const handleReview = async (cardId: string, quality: number) => {
    const result: StudyResult = {
      cardId,
      quality,
      timestamp: new Date().toISOString()
    }
    
    setStudyResults(prev => [...prev, result])
  }

  const handleNext = () => {
    if (isLastCard) {
      setShowResults(true)
    } else {
      setCurrentCardIndex(prev => prev + 1)
    }
  }

  const handleFinishStudy = async () => {
    setIsSubmitting(true)
    
    try {
      console.log("Submitting study results:", studyResults)
      
      const promises = studyResults.map(result => 
        fetch('/api/user_card_progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            card_id: result.cardId,
            quality: result.quality
          })
        })
      )

      await Promise.all(promises)
      console.log("Study session completed successfully")
      
      onFinish()
    } catch (error) {
      console.error("Error submitting study results:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateStats = () => {
    const total = studyResults.length
    const correct = studyResults.filter(r => r.quality >= 3).length
    const incorrect = total - correct
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

    return { total, correct, incorrect, accuracy }
  }

  if (cards.length === 0) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-center">No Cards to Study</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">This deck has no cards to study.</p>
              <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Deck
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showResults) {
    const stats = calculateStats()
    
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Study Session Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-500/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-400">{stats.correct}</div>
                  <div className="text-sm text-gray-300">Correct</div>
                </div>
                <div className="bg-red-500/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-red-400">{stats.incorrect}</div>
                  <div className="text-sm text-gray-300">Incorrect</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">{stats.accuracy}%</div>
                <div className="text-sm text-gray-300">Accuracy</div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={handleFinishStudy}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Saving..." : "Finish Study Session"}
                </Button>
                <Button 
                  onClick={onBack}
                >
                  Back to Deck
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <div className="text-white mb-2">
            Card {currentCardIndex + 1} of {cards.length}
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>

        <StudyCard
          card={currentCard}
          onReview={handleReview}
          onNext={handleNext}
        />

        <div className="mt-6 text-center">
          <Button 
            onClick={onBack}
            variant={"outline"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Study Session
          </Button>
        </div>
      </div>
    </div>
  )
} 