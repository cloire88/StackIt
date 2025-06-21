"use client"

import { AppHeader } from "@/components/app-header"
import { DashboardGreeting } from "@/components/dashboard-greeting"
import { RecentDecksSection } from "@/components/recent-decks-section"
import { useDashboard } from "@/hooks/use-dashboard"

const USER_NAME = "Zevanya" // In real app, this would come from auth context

export default function DashboardPage() {
  const { recentDecks, isLoading, handleDeckClick, handleSearchClick, handleSettingsClick } = useDashboard()

  return (
    <>
      <AppHeader onSettingsClick={handleSettingsClick} />

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <DashboardGreeting userName={USER_NAME} onSearchClick={handleSearchClick} />

          <RecentDecksSection decks={recentDecks} onDeckClick={handleDeckClick} />

          {isLoading && (
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
    </>
  )
}
