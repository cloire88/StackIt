"use client"

import { AppHeader } from "@/components/app-header"
import { DashboardGreeting } from "@/components/dashboard-greeting"
import { RecentDecksSection } from "@/components/recent-decks-section"
import { FloatingActionButton } from "@/components/floating-action-button"
import { useDashboard } from "@/hooks/use-dashboard"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReviewCard {
  id: string
  title: string
  deckName: string
  deckId: string
  nextReview: string
  interval: number
}

interface ReviewState {
  loading: boolean
  card: ReviewCard | null
}

export default function DashboardPage() {
  const [user, setUser] = useState<string>("User")
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [reviewState, setReviewState] = useState<ReviewState>({ loading: true, card: null })

  const { recentDecks, isLoading, handleDeckClick, handleSearchClick, handleSettingsClick } = useDashboard()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile")
        if (response.ok) {
          const { profile } = await response.json()
          setUser(profile?.username || "User")
        } else {
          console.error('Failed to fetch profile')
          setUser("User")
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        setUser("User")
      } finally {
        setIsLoadingUser(false)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchNextReviewCard = async () => {
      setReviewState({ loading: true, card: null })
      console.log("Dashboard: Fetching next review card...")
      try {
        const response = await fetch('/api/user_card_progress?next_review=true')
        console.log("Dashboard: API response status:", response.status)

        if (response.ok) {
          const data = await response.json()
          console.log("Dashboard: API response data:", data)
          const { nextReviewCard } = data

          if (nextReviewCard) {
            console.log("Dashboard: Setting next review card:", nextReviewCard)
            setReviewState({
              loading: false,
              card: {
                id: nextReviewCard.card.id,
                deckId: nextReviewCard.deck.id,
                title: nextReviewCard.card.front,
                deckName: nextReviewCard.deck.name,
                nextReview: nextReviewCard.progress.next_review,
                interval: nextReviewCard.progress.interval,
              },
            })
          } else {
            console.log("Dashboard: No card is due for review.")
            setReviewState({ loading: false, card: null })
          }
        } else {
          console.error('Dashboard: Failed to fetch next review card, status:', response.status)
          const errorText = await response.text()
          console.error('Dashboard: Error response body:', errorText)
          setReviewState({ loading: false, card: null })
        }
      } catch (error) {
        console.error('Dashboard: Error fetching next review card:', error)
        setReviewState({ loading: false, card: null })
      }
    }

    fetchNextReviewCard()
  }, [])

  const handleDeckCreated = (deckId: string) => {
    console.log("New deck created:", deckId)
  }

  const handleRename = (deckId: string) => {
    console.log("Rename deck:", deckId)
    toast.info("Rename functionality coming soon!")
  }

  const handleDelete = (deckId: string) => {
    console.log("Delete deck:", deckId)
    toast.info("Delete functionality coming soon!")
  }

  const handleAddTag = (deckId: string) => {
    console.log("Add tag to deck:", deckId)
    toast.info("Add tag functionality coming soon!")
  }

  const formatDueDate = (dateString: string) => {
    const reviewDate = new Date(dateString)
    const now = new Date()

    const reviewDay = new Date(reviewDate.getFullYear(), reviewDate.getMonth(), reviewDate.getDate())
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const diffTime = reviewDay.getTime() - today.getTime()
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`
    }
    if (diffDays === 0) {
      return reviewDate < now ? "Due now" : "Due today"
    }
    if (diffDays === 1) {
      return "Due tomorrow"
    }
    return `Due in ${diffDays} days`
  }

  return (
    <>
      <AppHeader onSettingsClick={handleSettingsClick} />

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <DashboardGreeting userName={user} onSearchClick={handleSearchClick} />

          {/* What to Review Next Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              What to Review Next
            </h2>
            {reviewState.loading ? (
              <Card className="bg-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-white/80">Checking for cards to review...</span>
                  </div>
                </CardContent>
              </Card>
            ) : reviewState.card ? (
              <Card className="bg-white backdrop-blur-sm border-blue-300/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 truncate">{reviewState.card.title}</h3>
                      <p className="text-gray text-sm mb-2 truncate">from {reviewState.card.deckName}</p>
                      <div className="flex items-center gap-2 text-blue-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{formatDueDate(reviewState.card.nextReview)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (reviewState.card) {
                          console.log("Navigate to deck for review:", reviewState.card.deckId)
                          router.push(`/deck/${reviewState.card.deckId}`)
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors ml-4 shrink-0"
                    >
                      Review Now
                    </button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-white/80 font-medium">You're all caught up! 🎉</p>
                  <p className="text-white/60 text-sm">No cards are due for review today.</p>
                </CardContent>
              </Card>
            )}
          </div>

          <RecentDecksSection 
            decks={recentDecks} 
            onDeckClick={handleDeckClick}
            onRename={handleRename}
            onDelete={handleDelete}
            onAddTag={handleAddTag}
          />

          {(isLoading || isLoadingUser) && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-700">Memuat...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <FloatingActionButton 
        mode="dashboard" 
        onDeckCreated={handleDeckCreated}
      />
    </>
  )
}
